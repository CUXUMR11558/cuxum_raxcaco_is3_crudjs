



<?php include_once '../../includes/header.php' ?>
<br><br><br><br><br>
<div class="container">
    <h1 class="text-center">Formulario de Areas</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="are_codigo" id="are_codigo">
            <div class="row mb-3">
                <div class="col">
                    <label for="are_nombre">Nombre del Area</label>
                    <input type="text" name="are_nombre" id="are_nombre" class="form-control" required>
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
            <h2 class="text-center">Listado de areas</h2>
            <table class="table table-bordered table-hover" id="tablaArea">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre Area</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">No hay areas disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="../../src/js/funciones.js"></script>
<script defer src="../../src/js/area/index.js"></script>
<?php include_once '../../includes/footer.php' ?>