



const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnBuscar = document.getElementById('btnBuscar')
const btnCancelar = document.getElementById('btnCancelar')
const btnLimpiar = document.getElementById('btnLimpiar')
const tablaasignacion = document.getElementById('tablaasignacion')
const formulario = document.querySelector('form')

btnModificar.parentElement.style.display = 'none'
btnCancelar.parentElement.style.display = 'none'

const getAsignacion = async () => {
    const empleado = formulario.nombre_completo.value
    const area = formulario.are_nombre.value
    

    const url = `/cuxum_raxcaco_is3_crudjs/controllers/asignacion/index.php?nombre_completo=${empleado}&are_nombre=${area}`
    const config = { 
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        tablaasignacion.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;
        if (respuesta.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: 'asignacion encontrada',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();


            if (data.length > 0) {
                data.forEach(asignacion => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')
                    const buttonModificar = document.createElement('button')
                    const buttonEliminar = document.createElement('button')

                    celda1.innerText = contador;
                    celda2.innerText = asignacion.nombre_completo;
                    celda3.innerText = asignacion.are_nombre;

                    buttonModificar.textContent = 'Modificar'
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100')
                    buttonModificar.addEventListener('click',()=>llenardatos(asignacion))


                    buttonEliminar.textContent = 'Eliminar'
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100')
                    buttonEliminar.addEventListener('click', () => eliminar(asignacion.asig_codigo));

                    celda4.appendChild(buttonModificar)
                    celda5.appendChild(buttonEliminar)

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay areas disponibles'
                td.colSpan = 5;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            console.log('hola');
        }

        tablaasignacion.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}

getAsignacion();


const guardarAsignacion = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/asignacion/index.php'
    const formData = new FormData(formulario)
    formData.append('tipo', 1)
    formData.delete('are_codigo')
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
        // alert(mensaje)
        // console.log(data);
        if (codigo == 1 && respuesta.status == 200) {
            getAsignacion();
            formulario.reset();
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}



const llenardatos =(asignacion) => {
    formulario.asig_codigo.value = asignacion.asig_codigo
    formulario.nombre_completo.value = asignacion.nombre_completo
    formulario.are_nombre.value = asignacion.are_nombre
    btnBuscar.parentElement.style.display = 'none'
    btnGuardar.parentElement.style.display = 'none'
    btnLimpiar.parentElement.style.display = 'none'
    btnModificar.parentElement.style.display = ''
    btnCancelar.parentElement.style.display = ''
}

const modificar= async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/asignacion/index.php'
    const formData = new FormData(formulario)
    formData.append('tipo', 2)
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo, detalle } = data;
        if (respuesta.ok && codigo === 2) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: mensaje,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
            formulario.reset()
            getAsignacion(); 
            btnBuscar.parentElement.style.display = ''
            btnGuardar.parentElement.style.display = ''
            btnLimpiar.parentElement.style.display = ''
            btnModificar.parentElement.style.display = 'none'
            btnCancelar.parentElement.style.display = 'none'
         
        } else {
            console.log('Error:', detalle);
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: 'Error al modificar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
    
    btnModificar.disabled = false;

}


const cancelar= async (e) => {
    e.preventDefault();
    btnCancelar.disabled = true;
    formulario.reset();
    btnBuscar.parentElement.style.display = ''
    btnGuardar.parentElement.style.display = ''
    btnLimpiar.parentElement.style.display = ''
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.parentElement.style.display = 'none'
  
    
    btnCancelar.disabled = false;

}





///////eliminar 



const eliminar = async (e) => {
    console.log(e)
    
    const formData = new FormData();
    formData.append('tipo', 3);
    formData.append('asig_codigo', e);
    
    console.log(formData)
    const url = '/cuxum_raxcaco_is3_crudjs/controllers/asignacion/index.php';
    const config = {
        method: 'POST',
        body: formData
    };
    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data)
        const { mensaje, codigo, detalle } = data;
        if (respuesta.status == 200 && codigo === 3) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: mensaje,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
            getAsignacion();
        } else {
            console.log('Error:', detalle);
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: 'Error al eliminar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
};






formulario.addEventListener('submit',guardarAsignacion)
btnBuscar.addEventListener('click',getAsignacion)
btnModificar.addEventListener('click',modificar)   
btnCancelar.addEventListener('click', cancelar)   
btnLimpiar.addEventListener('click', () => formulario.reset()); 


