



const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCancelar = document.getElementById('btnCancelar');
const btnLimpiar = document.getElementById('btnLimpiar');
const tablaempleado= document.getElementById('tablaempleado');
const formulario = document.querySelector('form');

btnModificar.parentElement.style.display = 'none';
btnCancelar.parentElement.style.display = 'none';

const getEmpleado = async (alert='si') => {


    const nombre = formulario.emp_nombre.value;
    const apellido = formulario.emp_apellido.value;
    const edad = formulario.emp_edad.value;
    const sexo = formulario.emp_sexo.value;
    const nit = formulario.emp_nit.value;
    const telefono = formulario.emp_telefono.value;
    const puesto = formulario.emp_puesto.value;
   

    const url = `/cuxum_raxcaco_is3_crudjs/controllers/empleado/index.php?emp_nombre=${nombre}&emp_apellido=${apellido}&emp_edad=${edad}&emp_sexo=${sexo}&emp_nit=${nit}&emp_telefono=${telefono}&emp_puesto=${puesto}`;
    const config = {
        method: 'GET'
    }
    

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        tablaempleado.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment();
        let contador = 1;
        console.log(data);
        if (respuesta.status == 200 ) {
            if(alert=='si'){
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: 'Datos enonctrados',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }

            if (data.length > 0) {
                data.forEach(empleado => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')
                    const celda6 = document.createElement('td')
                    const celda7 = document.createElement('td')
                    const celda8 = document.createElement('td')
                    const celda9 = document.createElement('td')
                    const celda10 = document.createElement('td')
                    const buttonModificar = document.createElement('button')
                    const buttonEliminar = document.createElement('button')

                    celda1.innerText = contador;
                    celda2.innerText = empleado.emp_nombre;
                    celda3.innerText = empleado.emp_apellido;
                    celda4.innerText = contador.emp_edad
                    celda5.innerText = empleado.emp_sexo
                    celda6.innerText = empleado.emp_nit
                    celda7.innerText = empleado.emp_telefono
                    celda8.innerText = empleado.emp_puesto;
                   
                    buttonModificar.textContent = 'Modificar'
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100')
                    buttonModificar.addEventListener('click',()=>llenardatos(empleado))


                    buttonEliminar.textContent = 'Eliminar'
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100')
                    buttonEliminar.addEventListener('click', () => eliminar(empleado.emp_codigo));

                    celda9.appendChild(buttonModificar)
                    celda10.appendChild(buttonEliminar)

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)
                    tr.appendChild(celda6)
                    tr.appendChild(celda7)
                    tr.appendChild(celda8)
                    tr.appendChild(celda9)
                    tr.appendChild(celda10)
                
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay puestos disponibles'
                td.colSpan = 5;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            console.log('hola');
        }

        tablaempleado.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}



getEmpleado();


const guardarEmpleado = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/empleado/index.php'
    const formData = new FormData(formulario)

    formData.append('tipo', 1)
    formData.delete('emp_codigo')

    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data)
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
            getEmpleado(alerta='no');
            formulario.reset();
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}



const llenardatos =(empleado) => {
    formulario.emp_codigo.value = empleado.emp_codigo
    formulario.emp_nombre.value = empleado.emp_nombre
    formulario.emp_edad.value = empleado.emp_edad
    formulario.emp_sexo.value = empleado.emp_sexo
    formulario.emp_nit.value = empleado.emp_nit
    formulario.emp_telefono.value = empleado.emp_telefono
    formulario.emp_puesto.value = empleado.emp_puesto
    btnBuscar.parentElement.style.display = 'none'
    btnGuardar.parentElement.style.display = 'none'
    btnLimpiar.parentElement.style.display = 'none'
    btnModificar.parentElement.style.display = ''
    btnCancelar.parentElement.style.display = ''
}

const modificar= async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/empleado/index.php'
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
                title: "modificado correctamente",
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
            formulario.reset()
            getEmpleado(alerta='no'); 
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



const eliminar = async (ID) => {
    console.log(ID)
    const formData = new FormData();
    formData.append('tipo', 3);
    formData.append('emp_codigo', ID);
    
    console.log(formData)
    const url = '/cuxum_raxcaco_is3_crudjs/controllers/empleado/index.php';
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
            getEmpleado(alerta='no');
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






formulario.addEventListener('submit',guardarEmpleado)
btnBuscar.addEventListener('click',getEmpleado)
btnModificar.addEventListener('click',modificar)   
btnCancelar.addEventListener('click', cancelar)   
btnLimpiar.addEventListener('click', () => formulario.reset()); 