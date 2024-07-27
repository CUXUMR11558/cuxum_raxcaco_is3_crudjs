<?php
require_once 'Conexion.php';

class empleado extends Conexion
{
    public $emp_codigo;
    public $emp_nombre;
    public $emp_apellido;
    public $emp_edad;
    public $emp_sexo;
    public $emp_nit;
    public $emp_telefono;
    public $emp_puesto;
    public $emp_situacion;

    public function __construct($args = [])
    {
        $this->emp_codigo = $args['emp_codigo'] ?? null;
        $this->emp_nombre = $args['emp_nombre'] ?? '';
        $this->emp_apellido = $args['emp_apellido'] ?? '';
        $this->emp_edad = $args['emp_edad'] ?? '';
        $this->emp_sexo = $args['emp_sexo'] ?? null;
        $this->emp_nit = $args['emp_nit'] ?? '';
        $this->emp_telefono = $args['emp_telefono'] ?? '';
        $this->emp_puesto = $args['emp_puesto'] ?? '';
        $this->emp_situacion = $args['emp_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO empleado (emp_nombre, emp_apellido, emp_edad, emp_sexo, emp_nit, emp_telefono, emp_puesto) 
        values('$this->emp_nombre','$this->emp_apellido','$this->emp_edad','$this->emp_sexo','$this->emp_nit','$this->emp_telefono','$this->emp_puesto')";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from empleado where emp_situacion = 1 ";

        if ($this->emp_nombre != '') {
            $sql .= " and emp_nombre like '%$this->emp_nombre%' ";
        }

        if ($this->emp_apellido != '') {
            $sql .= " and emp_apellido like '%$this->emp_apellido%' ";
        }
        if ($this->emp_edad != '') {
            $sql .= " and emp_edad = $this->emp_edad ";
        }

        if ($this->emp_sexo != '') {
            $sql .= " and emp_sexo like '%$this->emp_sexo%' ";
        }
        if ($this->emp_sexo != '') {
            $sql .= " and emp_sexo like '%$this->emp_sexo%' ";
        }

        if ($this->emp_nit != '') {
            $sql .= " and emp_nit like '%$this->emp_nit%' ";
        }
        if ($this->emp_telefono != '') {
            $sql .= " and emp_telefono = $this->emp_telefono";
        }

        if ($this->emp_puesto != '') {
            $sql .= " and emp_puesto like '%$this->emp_puesto%' ";
        }

        if ($this->emp_codigo != null) {
            $sql .= " and emp_codigo = $this->emp_codigo ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function modificar()
    {
        $sql = "UPDATE empleado SET emp_nombre = '$this->emp_nombre', emp_apellido = '$this->emp_apellido', emp_edad = '$this->emp_edad', emp_sexo = '$this->emp_sexo', emp_nit = '$this->emp_nit', emp_telefono = '$this->emp_telefono', emp_puesto = '$this->emp_puesto' WHERE emp_codigo = $this->emp_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function eliminar()
    {
        $sql = "UPDATE empleado SET emp_situacion = 0 where emp_codigo = $this->emp_codigo";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }
}
