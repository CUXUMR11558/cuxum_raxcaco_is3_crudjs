


<?php
require '../../models/area.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

// echo json_encode($_GET);
// exit;
try {
    switch ($metodo) {
        case 'POST':
            $area = new area($_POST);
            switch ($tipo) {
                case '1':

                    $ejecucion = $area->guardar();
                    $mensaje = "Guardado correctamente";
                    $codigo = 1;
                    break;
                    case '2':
                        $ejecucion = $area->modificar();
                        $mensaje = "Modificado correctamente";
                        $codigo = 2;
                        break;
                    case '3':
                        $ejecucion = $area->eliminar();
                            $mensaje = "Eliminado correctamente";
                            $codigo = 3;
                        break;
                    default:
                        throw new Exception("Tipo de acción no válido");
                }

            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => $codigo,
            ]);
            break;
        case 'GET':
            http_response_code(200);
            $area = new area($_GET);
            $areas = $area->buscar();
            echo json_encode($areas);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;
