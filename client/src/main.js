import './styles/globals.css';
import { obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, eliminarProducto } from './services/products.service.js';
import { alertaExitosa, alertaConfirmacion, alertError } from './utils/alert.js';
import { actualizarEstadisticas } from '../ui/estadisticas.js';
import { imprimirProductos } from '../ui/renderProductos.js';

document.addEventListener("DOMContentLoaded", async () => {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    if (!usuarioActivo) {
        window.location.href = "/login.html"
        return
    }
    document.getElementById("nombre-usuario").textContent = usuarioActivo.nombre

    await traerProductos()
})

window.cerrarSesion = function() {
    localStorage.removeItem("usuarioActivo")
    window.location.href = "/login.html"
}

document.addEventListener("DOMContentLoaded", async () => {
    await traerProductos();
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

// Agregar un event listener para el evento "submit" del formulario, que se dispara cuando se envía el formulario
formulario.addEventListener("submit", async (event) => {
    event.preventDefault()

    try {
        const nuevoProducto = {
            nombre: nombreProducto.value.trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" "),
            precio: Number(precioProducto.value),
            unidad: Number(unidadProducto.value),
            descripcion: descripcionProducto.value.trim() ? descripcionProducto.value.trim().charAt(0).toUpperCase() + descripcionProducto.value.trim().slice(1).toLowerCase() : "Sin descripcion"
        }

        if (editandoId) {
            await guardarCambiosProducto(editandoId, nuevoProducto)
        } else {
            await agregarProductoAPI(nuevoProducto)
        }

    } catch (error) {
        alertError("Error al guardar el producto. Por favor, intenta de nuevo.")
        console.error("Error al guardar el producto:", error)
    }
})
// Agregar un event listener para el evento "reset" del formulario, que se dispara cuando se hace clic en el botón de reset o se llama al método reset() del formulario
formulario.addEventListener("reset", () => {
    editandoId = null
    formTitle.textContent = "Detalles del producto"
    submitBtn.textContent = "Guardar Productos"
})

// Agregar un event listener para el evento "click" en el cuerpo de la tabla
tableBody.addEventListener("click", async (e) => {
    // Si el clic fue en un botón de editar, se obtiene el ID del producto a editar
    if (e.target.closest(".btn-editar")) {
        const id = e.target.closest(".btn-editar").dataset.id
        await prepararEdicion(id)
    }
    // Si el clic fue en un botón de eliminar, se obtiene el ID del producto a eliminar
    if (e.target.closest(".btn-eliminar")) {
        const id = e.target.closest(".btn-eliminar").dataset.id
        const confirmacion = await alertaConfirmacion("¿Estás seguro de que quieres eliminar este producto?")

        if (confirmacion) { // Si el usuario confirma la eliminación, se llama a la función para eliminar el producto
            await eliminarProducto(id)
            await traerProductos()
            alertaExitosa("Producto eliminado exitosamente")
        }
    }

    // Si el clic fue en un botón de editar, se obtiene el ID del producto a editar
    if (e.target.closest(".btn-editar")) {
        const id = e.target.closest(".btn-editar").dataset.id
        await prepararEdicion(id)
    }
})

// GET
async function traerProductos() {

    try { // Obtener la lista de productos desde el backend
        const productos = await obtenerProductos()
        todosLosProductos = productos
        paginaActual = 1
        mostrarPagina(productos, paginaActual)
        actualizarEstadisticas(productos)

    } catch (error) { // Manejar cualquier error que ocurra durante el proceso de traer los productos
        console.error("Error al traer datos:", error)
        alert("Hubo un error al cargar los productos.")
    }
}

// POST
async function agregarProductoAPI(producto) {

    try { // Agregar el nuevo producto a la base de datos
        await crearProducto(producto)
        await traerProductos()
        alertaExitosa("Producto agregado exitosamente")
        formulario.reset()

    } catch (error) { // Manejar cualquier error que ocurra durante el proceso de agregar el producto
        console.error("Error al agregar producto:", error)
        alert("Hubo un error al guardar el producto. Por favor, intenta nuevamente.")
    }
}

// PUT
async function guardarCambiosProducto(id, producto) {
    // Mostrar una alerta de carga mientras se actualiza el producto
    try {
        await actualizarProducto(id, producto)
        await traerProductos()
        alertaExitosa("Producto actualizado exitosamente")
        formulario.reset()

    } catch (error) { // Manejar cualquier error que ocurra durante el proceso de actualizar el producto
        console.error("Error al actualizar producto:", error)
        alert("Hubo un error al guardar el producto. Por favor, intenta nuevamente.")
    }
}


// DELETE
async function eliminarProductoAPI(id) {

    try { // Mostrar una alerta de carga mientras se elimina el producto
        await eliminarProducto(id)
        await traerProductos()
        alertaExitosa("Producto eliminado exitosamente")

    } catch (error) { // Manejar cualquier error que ocurra durante el proceso de eliminar el producto
        console.error("Error al eliminar producto:", error)
        alert("Hubo un error al eliminar el producto. Por favor, intenta nuevamente.")
    }
}

// EDIT
async function prepararEdicion(id) {

    try { // Obtener los datos del producto a editar y llenar el formulario con esos datos
        const producto = await obtenerProductoId(id)

        nombreProducto.value = producto.nombre
        precioProducto.value = producto.precio
        unidadProducto.value = producto.unidad
        descripcionProducto.value = producto.descripcion

        editandoId = id
        formTitle.textContent = "Editar producto"
        submitBtn.textContent = "Actualizar producto"

    } catch (error) { // Manejar cualquier error que ocurra durante el proceso de preparar la edición del producto
        console.error("Error al preparar edición:", error)
        alertError("Hubo un error al cargar los datos del producto. Por favor, intenta nuevamente.")
    }
}


// PAGINACIÓN
const productosPorPagina = 6
let paginaActual = 1
let todosLosProductos = []

// Función para mostrar una página específica de productos en la tabla
function mostrarPagina(productos, pagina) {
    const inicio = (pagina - 1) * productosPorPagina
    const fin = inicio + productosPorPagina
    const productosPagina = productos.slice(inicio, fin)
    imprimirProductos(productosPagina)

    const total = productos.length
    const desde = inicio + 1
    const hasta = Math.min(fin, total)

    const spanPaginacion = document.getElementById("paginacion-texto")
    if (spanPaginacion) spanPaginacion.textContent = `Mostrando ${desde} al ${hasta} de ${total} productos`

    const btnPrev = document.getElementById("btn-prev")
    const btnNext = document.getElementById("btn-next")

    // Habilitar o deshabilitar los botones de paginación según la página actual y el total de productos
    if (pagina === 1) {
        btnPrev.classList.add("opacity-40", "cursor-not-allowed")
        btnPrev.disabled = true
    } else {
        btnPrev.classList.remove("opacity-40", "cursor-not-allowed")
        btnPrev.disabled = false
    }
    // Si el fin de la página actual es mayor o igual al total de productos, se deshabilita el botón de siguiente
    if (fin >= total) {
        btnNext.classList.add("opacity-40", "cursor-not-allowed")
        btnNext.disabled = true
    } else {
        btnNext.classList.remove("opacity-40", "cursor-not-allowed")
        btnNext.disabled = false
    }
    // Agregar event listeners a los botones de paginación para cambiar de página al hacer clic
    document.getElementById("btn-prev").addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--
            mostrarPagina(todosLosProductos, paginaActual)
        }
    })
    // Si el fin de la página actual es mayor o igual al total de productos, se deshabilita el botón de siguiente
    document.getElementById("btn-next").addEventListener("click", () => {
        if (paginaActual * productosPorPagina < todosLosProductos.length) {
            paginaActual++
            mostrarPagina(todosLosProductos, paginaActual)
        }
    })
}

// BÚSQUEDA
const inputBusqueda = document.querySelector("input[placeholder='Buscar en el catálogo...']")

// Agregar un event listener para el evento "input" del campo de búsqueda, que se dispara cada vez que el usuario escribe algo en el campo
inputBusqueda.addEventListener("input", () => {
    const termino = inputBusqueda.value.toLowerCase().trim()
    
    const productosFiltrados = todosLosProductos.filter(producto => 
        producto.nombre.toLowerCase().includes(termino)
    )
// Reiniciar a la primera página cada vez que se realiza una búsqueda para mostrar los resultados desde el inicio
    paginaActual = 1
    mostrarPagina(productosFiltrados, paginaActual)
})
