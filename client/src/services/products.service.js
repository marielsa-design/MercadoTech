const endpoint = "http://localhost:3000/productos"

export async function traerProductos() {

    try {
        const response = await fetch(endpoint)
        if (!response.ok) {
            alert("Error: Sistema fuera de servicio")
            return 
        }
        const data = await response.json()
        return data

    } catch (error) {
        alert("Error: No se pudieron cargar los productos")
        console.error(error)
        return 
    }
}

export async function agregarProducto(producto) {

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })

        if (!response.ok) {
            throw new Error("No se pudo agregar producto")
        }
        return await response.json()

    } catch (error) {
        console.error(error)
        throw error
    }
}