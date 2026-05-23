
// Función para actualizar las estadísticas en el dashboard
export function actualizarEstadisticas(producto) {
    const totalSKU = producto.length
    const valorTotal = producto.reduce((acumulador, productoActual) => acumulador + (productoActual.precio * productoActual.unidad), 0)
    const stockCritico = producto.filter(productoActual => productoActual.unidad <= 5).length

    document.getElementById("stat-total").textContent = totalSKU
    document.getElementById("stat-value").textContent = `COP ${valorTotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`
    document.getElementById("stat-low").textContent = stockCritico
}