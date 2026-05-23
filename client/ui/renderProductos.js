export function imprimirProductos(productos) {
    const tbody = document.getElementById("inventory-list")
    tbody.innerHTML = ""

    for (const producto of productos) {
        const fila = document.createElement("tr")
        fila.className = "hover:bg-slate-50/30 transition-colors group"
        fila.innerHTML = `
            <td class="px-8 py-6">
                <div class="flex flex-col">
                    <span class="font-bold text-slate-900">${producto.nombre}</span>
                    <span class="text-xs text-slate-400 mt-1">${producto.descripcion ?? "Sin descripcion"}</span>
                </div>
            </td>
            <td class="px-8 py-6 text-center whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-xl text-sm font-black border whitespace-nowrap ${producto.unidad <= 5 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}">${producto.unidad} unidades</span>
            </td>
            <td class="px-8 py-6 text-center font-bold text-slate-900">COP ${producto.precio.toLocaleString('es-CO')}</td>
            <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-3">
                    <button data-id="${producto.id}" class="btn-editar w-10 h-10 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button data-id="${producto.id}" class="btn-eliminar w-10 h-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        `
        tbody.appendChild(fila)
    }
}