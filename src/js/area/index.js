const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCancelar = document.getElementById('btnCancelar');
const btnLimpiar = document.getElementById('btnLimpiar');
const tablaArea = document.getElementById('tablaArea');
const formulario = document.querySelector('form');

btnModificar.parentElement.style.display = 'none';
btnCancelar.parentElement.style.display = 'none';

const getArea = async (alerta ='si') => {
    const nombre = formulario.are_nombre.value;
    const url = `/cuxum_raxcaco_is3_crudjs/controllers/area/index.php?are_nombre=${nombre}`;
    const config = { method: 'GET' };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        if (respuesta.status === 200) {
            if(alerta === 'si'){
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Área encontrada',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            tablaArea.tBodies[0].innerHTML = '';
            const fragment = document.createDocumentFragment();
            let contador = 1;
            if (data.length > 0) {
                data.forEach(area => {
                    const tr = document.createElement('tr');
                    const celda1 = document.createElement('td');
                    const celda2 = document.createElement('td');
                    const celda3 = document.createElement('td');
                    const celda4 = document.createElement('td');
                    const buttonModificar = document.createElement('button');
                    const buttonEliminar = document.createElement('button');

                    celda1.innerText = contador;
                    celda2.innerText = area.are_nombre;

                    buttonModificar.textContent = 'Modificar';
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100');
                    buttonModificar.addEventListener('click', () => llenardatos(area));

                    buttonEliminar.textContent = 'Eliminar';
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    buttonEliminar.addEventListener('click', () => eliminar(area.are_codigo));

                    celda3.appendChild(buttonModificar);
                    celda4.appendChild(buttonEliminar);

                    tr.appendChild(celda1);
                    tr.appendChild(celda2);
                    tr.appendChild(celda3);
                    tr.appendChild(celda4);
                    fragment.appendChild(tr);

                    contador++;
                });
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'No hay áreas disponibles';
                td.colSpan = 5;

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
            tablaArea.tBodies[0].appendChild(fragment);
        } else {
            console.log('Error en la respuesta:', respuesta.status);
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
};

getArea();

const guardarArea = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/area/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 1);
    formData.delete('are_codigo');

    const config = {
        method: 'POST',
        body: formData
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        const { mensaje, codigo, detalle } = data;
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

        if (codigo == 1 && respuesta.status == 200) {
            getArea(alerta='no');
            formulario.reset();
        } else {
            console.log('Error:', detalle);
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
    btnGuardar.disabled = false;
};

const llenardatos = (area) => {
    formulario.are_codigo.value = area.are_codigo;
    formulario.are_nombre.value = area.are_nombre;
    btnBuscar.parentElement.style.display = 'none';
    btnGuardar.parentElement.style.display = 'none';
    btnLimpiar.parentElement.style.display = 'none';
    btnModificar.parentElement.style.display = '';
    btnCancelar.parentElement.style.display = '';
};

const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/area/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 2);

    const config = {
        method: 'POST',
        body: formData
    };

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

            formulario.reset();
            getArea(alerta='no'); 
            btnBuscar.parentElement.style.display = '';
            btnGuardar.parentElement.style.display = '';
            btnLimpiar.parentElement.style.display = '';
            btnModificar.parentElement.style.display = 'none';
            btnCancelar.parentElement.style.display = 'none';
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
};

const cancelar = (e) => {
    e.preventDefault();
    formulario.reset();
    btnBuscar.parentElement.style.display = '';
    btnGuardar.parentElement.style.display = '';
    btnLimpiar.parentElement.style.display = '';
    btnModificar.parentElement.style.display = 'none';
    btnCancelar.parentElement.style.display = 'none';
};

const eliminar = async (e) => {
    const formData = new FormData();
    formData.append('tipo', 3);
    formData.append('are_codigo', e);

    const url = '/cuxum_raxcaco_is3_crudjs/controllers/area/index.php';
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

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
            getArea(alerta='no');
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

formulario.addEventListener('submit', guardarArea);
btnBuscar.addEventListener('click', getArea);
btnModificar.addEventListener('click', modificar);
btnCancelar.addEventListener('click', cancelar);
