export function imprimirProductos(productos) {
    const lugarDeImpresion = document.getElementById("inventory-list")
    lugarDeImpresion.innerHTML = "" // Limpiar el contenido antes de imprimir los productos

    for (const producto of productos) {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.unidad}</td>
            <td>${producto.descripcion}</td>
        `
        lugarDeImpresion.appendChild(fila)
    }
}