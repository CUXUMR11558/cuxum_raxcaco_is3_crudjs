<?php
require_once 'Conexion.php';

class puesto extends Conexion
{
    public $pue_codigo;
    public $pue_nombre;
    public $pue_sueldo;
    public $pue_situacion;

    public function __construct($args = [])
    {
        $this->pue_codigo = $args['pue_codigo'] ?? null;
        $this->pue_nombre = $args['pue_nombre'] ?? '';
        $this->pue_sueldo = $args['pue_sueldo'] ?? '';
        $this->pue_situacion = $args['pue_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO puesto (pue_nombre, pue_sueldo) values('$this->pue_nombre','$this->pue_sueldo')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from puesto where pue_situacion = 1 ";

        if ($this->pue_nombre != '') {
            $sql .= " and pue_nombre like '%$this->pue_nombre%' ";
        }

        if ($this->pue_sueldo != '') {
            $sql .= " and pue_sueldo = $this->pue_sueldo ";
        }

        
        if ($this->pue_codigo != null) {
            $sql .= " and pue_codigo = $this->pue_codigo ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function modificar()
    {
        $sql = "UPDATE puesto SET pue_nombre = '$this->pue_nombre', pue_sueldo = '$this->pue_sueldo' where pue_codigo = $this->pue_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function eliminar()
    {
        $sql = "UPDATE puesto SET pue_situacion = 0 where pue_codigo = $this->pue_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }



}


