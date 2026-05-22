import './styles/globals.css';
import { traerProductos, agregarProducto as agregarProductoAPI } from './services/products.service.js';
import { Alert } from 'bootstrap';
import { alertaExitosa } from './utils/alert.js';

document.addEventListener("DOMContentLoaded", async () => {
    const datos = await traerProductos();
    imprimirProductos(datos);
})

// Obtener referencias a los elementos del formulario
const formulario = document.getElementById("product-form")
const formTitle = document.getElementById("form-title")
const submitBtn = formulario.querySelector("button[type='submit']")

// Obtener referencias a los campos del formulario
const nombreProducto = document.getElementById("nombre")
const precioProducto = document.getElementById("precio")
const unidadProducto = document.getElementById("unidad")
const descripcionProducto = document.getElementById("descripcion")

// Obtener referencia al cuerpo de la tabla donde se mostrarán los productos
const tableBody = document.getElementById("inventory-list")

let editandoId = null // Variable para almacenar el ID del producto que se está editando (si es el caso)

formulario.addEventListener("submit", async (event) => { // Al enviar el formulario, prevenir la acción por defecto (recargar la página)
    event.preventDefault()

    try { 
    const nuevoProducto = { // Crear un nuevo producto con los datos del formulario
        nombre: nombreProducto.value.toLowerCase().trim(),
        precio: Number(precioProducto.value),
        unidad: Number(unidadProducto.value),
        descripcion: descripcionProducto.value.toLowerCase().trim() ? descripcionProducto.value.toLowerCase().trim() : "Sin descripcion"
    }
    
    console.log(nuevoProducto)

    // Agregar el nuevo producto a la base de datos a través de la función agregarProductoAPI
    await agregarProductoAPI(nuevoProducto)
    alertaExitosa("Producto agregado exitosamente") // Mostrar una alerta de éxito al usuario después de agregar el producto
        
        const productosActualizados = await traerProductos() // Traer la lista actualizada de productos después de agregar el nuevo producto
        imprimirProductos(productosActualizados) // Imprimir la lista actualizada de productos en la tabla
        event.target.reset() // Limpiar el formulario después de agregar el producto

        } catch (error) { // En caso de error, mostrar una alerta al usuario
        alert("Error: No se pudo guardar el producto")
        console.error(error)
    }
})

// Función para imprimir los productos en la tabla
function imprimirProductos(listaDeLosProductos) { 
    const tbody = document.querySelector("#inventory-list")
    tbody.innerHTML = ""
    for (const producto of listaDeLosProductos) { // Iterar sobre la lista de productos y agregar una fila por cada producto
        tbody.innerHTML += `
        <tr class="hover:bg-slate-50/30 transition-colors group">
        <td class="px-8 py-6">
            <div class="flex flex-col">
            <span class="font-bold text-slate-900">${producto.nombre}</span>
            <span class="text-xs text-slate-400 mt-1">${producto.descripcion ?? "Sin descripcion"}</span>
            </div>
        </td>
        <td class="px-8 py-6 text-center">
            <span class="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-black border border-emerald-100">${producto.unidad} unidades</span>
        </td>
        <td class="px-8 py-6 text-center font-bold text-slate-900">COP ${producto.precio}</td>
        <td class="px-8 py-6 text-right">
            <div class="flex justify-end gap-3">
            <button data-id="${producto.id}" class="w-10 h-10 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button data-id="${producto.id}" class="w-10 h-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </td>
        </tr>
        `
    }
}
