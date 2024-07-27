

<?php include_once '../../includes/header.php' ?>
<br><br><br><br><br>

<?php

require '../../models/empleado.php';
require '../../models/area.php';
$empleado = new Empleado($_GET);
$empleados = $empleado->buscar();

$area = new Area($_GET);
$areas = $area->buscar();

?>
<div class="container">
    <h1 class="text-center">Asignacion de Areas a Empleados</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="pue_codigo" id="pue_codigo">
            
            
            <div class="row mb-3">
            <div class="col">
                <label for="nombre_completo">Nombre del Empleado</label>
                <select name="nombre_completo" id="nombre_completo" class="form-control">
                    <option value="">SELECCIONE...</option>
                    <?php foreach ($empleados as $empleado) : ?>
                        <option value="<?= $empleado['emp_codigo'] ?>"> <?= $empleado['emp_nombre'] ?></option>
                    <?php endforeach ?>
                </select>
            </div>
        </div>

       

        <div class="row mb-3">
            <div class="col">
                <label for="are_nombre">Area a asignar</label>
                <select name="are_nombre" id="are_nombre" class="form-control">
                    <option value="">SELECCIONE...</option>
                    <?php foreach ($areas as $area) : ?>
                        <option value="<?= $area['are_codigo'] ?>"> <?= $area['are_nombre'] ?></option>
                    <?php endforeach ?>
                </select>
            </div>
        </div>

           

            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnCancelar" class="btn btn-secondary w-100">Cancelar</button>
                </div>
                <div class="col">
                    <button type="reset" id="btnLimpiar" class="btn btn-secondary w-100">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de puestos</h2>
            <table class="table table-bordered table-hover" id="tablaasignacion">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>nombre Empleado</th>
                        <th>Area asignada</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">No hay puestos disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="../../src/js/funciones.js"></script>
<script defer src="../../src/js/asignacion/index.js"></script>
<?php include_once '../../includes/footer.php' ?>