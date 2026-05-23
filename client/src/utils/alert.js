import Swal from 'sweetalert2';

// Función para mostrar una alerta de éxito al usuario
export function alertaExitosa(mensaje) {
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon: "success",
        title: mensaje
    });
}

// Función para mostrar una alerta de error al usuario
export function alertError(mensaje) {
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon: "error",
        text: mensaje
    });
}

// Función para mostrar una alerta de confirmación antes de eliminar un producto
export async function alertaConfirmacion(titulo = "¿Estás seguro?", texto = "No podrás revertir esta acción") {
    const result = await Swal.fire({
        title: titulo,
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });
    return result.isConfirmed;
}