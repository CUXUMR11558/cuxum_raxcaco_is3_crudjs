

<?php include_once '../../includes/header.php' ?>
<br><br><br><br><br>
<div class="container">
    <h1 class="text-center">PUESTOS EN LA EMPRESA</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="pue_codigo" id="pue_codigo">
            
            
            <div class="row mb-3">
                <div class="col">
                    <label for="pue_nombre">Nombre del puesto</label>
                    <input type="text" name="pue_nombre" id="pue_nombre" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="pue_sueldo">Sueldo</label>
                    <input type="number" name="pue_sueldo" id="pue_sueldo" class="form-control" required>
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
            <table class="table table-bordered table-hover" id="tablapuesto">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>nombre</th>
                        <th>sueldo</th>
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
<script defer src="../../src/js/puesto/index.js"></script>
<?php include_once '../../includes/footer.php' ?>