const endpoint = "http://localhost:3000/productos"

// Función para obtener la lista de productos desde el backend
export async function obtenerProductos() {  

    try {
        const response = await fetch(endpoint)
        if (response.ok == false) {
            throw new Error("No se pudieron cargar los productos")
        } else {
            return await response.json()
        }
    } catch (error) {
        console.error("Error al obtener productos:", error)
        throw error
    }
}

// Función para obtener un producto específico por su ID
export async function obtenerProductoId(id) { 

    try {
        const response = await fetch(`${endpoint}/${id}`)
        if (response.ok == false) {
            throw new Error("Error: al obtener el producto")
        } else {
            return await response.json()
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error)
        throw error
    }
}

// Función para crear un nuevo producto
export async function crearProducto(producto) { 

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })

        if (response.ok == false) {
            throw new Error("Error al crear el producto")
        } else {
            return await response.json()
        }
    } catch (error) {
        console.error("Error al crear el producto:", error)
        throw error
    }
}

// Función para actualizar un producto existente
export async function actualizarProducto(id, producto) { 

}

// Función para actualizar parcialmente un producto existente
export async function actualizarParcialProducto(id, cambios) { 
    
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nombre: "nuevo nombre"})
        })

        if (response.ok == false) {
            throw new Error("Error al actualizar parcialmente el producto")
        } else {
        return await response.json()
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}

// Función para eliminar un producto
export async function eliminarProducto(id) { 

    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "DELETE"
        })

        if (response.ok == false) {
            throw new Error("Error al eliminar el producto")
        } else {
            return await response.json()
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}