<?php
require_once 'Conexion.php';

class area extends Conexion
{
    public $are_codigo;
    public $are_nombre;
    public $are_situacion;


    public function __construct($args = [])
    {
        $this->are_codigo = $args['are_codigo'] ?? null;
        $this->are_nombre = $args['are_nombre'] ?? '';
        $this->are_situacion = $args['are_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO area (are_nombre) values('$this->are_nombre')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from area where are_situacion = 1 ";

        if ($this->are_nombre != '') {
            $sql .= " and are_nombre like '%$this->are_nombre%' ";
        }


        if ($this->are_codigo != null) {
            $sql .= " and are_codigo = $this->are_codigo ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function modificar()
    {
        $sql = "UPDATE area SET are_nombre = '$this->are_nombre' where are_codigo = $this->are_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function eliminar()
    {
        $sql = "UPDATE area SET are_situacion = 0 where are_codigo = $this->are_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }
}
