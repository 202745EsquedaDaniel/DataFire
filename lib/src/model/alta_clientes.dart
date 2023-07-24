import 'package:flutter/material.dart';

import 'alta_proyectos.dart';

//modelo para dar de alta clientes
class Clientes {
  String? nombre;
  String? descripcion;
  List<Proyecto>? proyectos;

  Clientes(this.nombre, {this.proyectos});

  void agregarProyecto(Proyecto proyecto) {
    proyectos!.toList().add(proyecto);
  }
}
