<?php

require_once 'Conexion.php';

class asignacion extends Conexion
{
    public $asig_codigo;
    public $asig_empleado;
    public $asig_area;
    public $asig_situacion;



    public function __construct($args = [])
    {
        $this->asig_codigo = $args['asig_codigo'] ?? null;
        $this->asig_empleado = $args['asig_empleado'] ?? '';
        $this->asig_area = $args['asig_area'] ?? '';
        $this->asig_situacion = $args['asig_situacion'] ?? 1;
    }

    // METODO PARA INSERTAR

    public static function buscarTodos(...$columnas)
    {
        // $cols = '';
        // if(count($columnas) > 0){
        //     $cols = implode(',', $columnas) ;
        // }else{
        //     $cols = '*';
        // }
        $cols = count($columnas) > 0 ? implode(',', $columnas) : '*';
        $sql = "SELECT $cols FROM asignacion_area where asig_situacion = 1 ";
        $resultado = self::servir($sql);
        return $resultado;
    }
    public function guardar()
    {
        $sql = "INSERT into asignacion_area (asig_empleado, asig_area) values ('$this->asig_empleado','$this->asig_area')";
        $resultado = $this->ejecutar($sql);
        return $resultado;
    }

    // METODO PARA CONSULTAR

    public function buscar(...$columnas)
    {
        $cols = count($columnas) > 0 ? implode(',', $columnas) : '*';
        $sql = "SELECT $cols FROM asignacion_area where asig_situacion = 1 ";

        if ($this->asig_empleado != '') {
            $sql .= " AND asig_empleado = $this->asig_empleado ";
        }
        if ($this->asig_area != '') {
            $sql .= " AND asig_area = $this->asig_area ";
        }


        $resultado = self::servir($sql);
        return $resultado;
    }

    public function MostrarArea()
    {

        $sql = "SELECT asig_codigo, emp_nombre || ' ' || emp_apellido AS nombre_completo, are_nombre FROM asignacion_area INNER JOIN empleado ON asig_empleado = emp_codigo INNER JOIN area ON asig_area = are_codigo WHERE asig_situacion = 1 ";

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function MostrarAreaID($id)
    {

        $sql = "SELECT  emp_nombre || ' ' || emp_apellido AS nombre_completo, are_nombre FROM asignacion_area INNER JOIN empleado ON asig_empleado = emp_codigo INNER JOIN area ON asig_area = are_codigo WHERE asig_situacion = 1 AND asig_codigo = $id";
        $resultado = array_shift(self::servir($sql));
        // $resultado = self::servir($sql)[0];
        return $resultado;
    }


    public function buscarPorId($id)
    {

        $sql = "SELECT * FROM asignacion_area where asig_situacion = 1 and asig_codigo = $id ";
        $resultado = array_shift(self::servir($sql));
        // $resultado = self::servir($sql)[0];
        return $resultado;
    }

    // METODO PARA MODIFICAR
    public function modificar()
    {
        $sql = "UPDATE asignacion_area SET asig_empleado = '$this->asig_empleado', asig_area ='$this->asig_area' WHERE asig_codigo ='$this->asig_codigo'";
        $resultado = $this->ejecutar($sql);
        return $resultado;
    }



    public function eliminar()
    {
        // $sql = "DELETE FROM productos WHERE prod_id = $this->prod_id ";

        // echo $sql;
        $sql = "UPDATE asignacion_area SET asig_situacion = 0 WHERE asig_codigo = $this->asig_codigo ";
        $resultado = $this->ejecutar($sql);
        return $resultado;
    }





}
