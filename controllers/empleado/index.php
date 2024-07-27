<?php
require '../../models/empleado.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'] ?? null; 

// echo json_encode($_POST);
// exit;
try {
    $empleado = new empleado($_POST);

    switch ($metodo) {
        case 'POST':
            switch ($tipo) {
                case '1':
                    $ejecucion = $empleado->guardar();
                    $mensaje = "Guardado correctamente";
                    $codigo = 1;
                    break;
                case '2':
                    $ejecucion = $empleado->modificar();
                    $mensaje = "Modificado correctamente";
                    $codigo = 2;
                    break;
                case '3':
                    $ejecucion = $empleado->eliminar();
                   
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
            $empleado = new empleado($_GET);
            $empleados = $empleado->buscar();
            echo json_encode($empleados);
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
