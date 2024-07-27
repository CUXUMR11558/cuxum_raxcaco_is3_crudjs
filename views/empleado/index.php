



<?php include_once '../../includes/header.php' ?>

<?php
// $objCliente = new Empleado();
//     $clientes = $objCliente->buscar();

require '../../models/puesto.php';
$puesto = new Puesto($_GET);
$puestos = $puesto->buscar();
?>
<br><br><br><br><br>
<div class="container">
    <h1 class="text-center">Registrar Empleados</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="emp_codigo" id="emp_codigo">

            <div class="row">
                <div class="col mb-3">
                    <div class="col">
                        <label for="emp_nombre">Nombre del empleado</label>
                        <input type="text" name="emp_nombre" id="emp_nombre" class="form-control" required>
                    </div>
                </div>
                <div class="col mb-3">
                    <div class="col">
                        <label for="emp_apellido">apellido del empleado</label>
                        <input type="text" name="emp_apellido" id="emp_apellido" class="form-control" required>
                    </div>
                </div>

                <div class="col mb-3">
                    <div class="col">
                        <label for="emp_edad">edad</label>
                        <input type="number" name="emp_edad" id="emp_edad" class="form-control" required>
                    </div>
                </div>

                <div class="col form-group mb-3">
                    <label for="emp_sexo">Sexo del Empleado</label>
                    <select name="emp_sexo" id="emp_sexo" class="form-control" required>
                        <option value="">Seleccione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
            </div>

            <div class="row">

                <div class="col mb-3">
                    <div class="col">
                        <label for="emp_nit">No. Nit</label>
                        <input type="text" name="emp_nit" id="emp_nit" class="form-control" required>
                    </div>
                </div>
                <div class="col mb-3">
                    <div class="col">
                        <label for="emp_telefono">telefono</label>
                        <input type="number" name="emp_telefono" id="emp_telefono" class="form-control" required>
                    </div>
                </div>

                <div class="col form-group mb-3">
                    <label for="emp_puesto">Puesto</label>
                    <select name="emp_puesto" id="emp_puesto" class="form-control" required>
                        <option value="">SELECCIONE...</option>
                        <?php foreach ($puestos as $puesto) : ?>
                            <option value="<?= $puesto['pue_codigo'] ?>"> <?= $puesto['pue_nombre'] ?></option>
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
            <h2 class="text-center">Listado de empleados</h2>
            <table class="table table-bordered table-hover" id="tablaempleado">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>nombres</th>
                        <th>apellidos</th>
                        <th>edad</th>
                        <th>Sexo</th>
                        <th>Nit</th>
                        <th>Telefono</th>
                        <th>Puesto</th>
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
<script defer src="../../src/js/empleado/index.js"></script>
<?php include_once '../../includes/footer.php' ?>