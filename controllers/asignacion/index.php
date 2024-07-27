


<?php
require '../../models/asignacion.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

// echo json_encode($_GET);
// exit;
try {
    switch ($metodo) {
        case 'POST':
            $asignacion = new asignacion($_POST);
            switch ($tipo) {
                case '1':

                    $ejecucion = $asignacion->guardar();
                    $mensaje = "Guardado correctamente";
                    $codigo = 1;
                    break;
                    case '2':
                        $ejecucion = $asignacion->modificar();
                        $mensaje = "Modificado correctamente";
                        $codigo = 2;
                        break;
                    case '3':
                        $ejecucion = $asignacion->eliminar();
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
            $asignacion = new asignacion($_GET);
            $asignacions = $asignacion->MostrarArea();
            echo json_encode($asignacions);
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
