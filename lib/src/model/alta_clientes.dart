import 'package:flutter/material.dart';

import 'alta_proyectos.dart';

//modelo para dar de alta clientes
class Clientes {
  String? nombre;

  List<Proyecto>? proyectos;
  List<Clientes>? clientes;

  Clientes(this.nombre, this.proyectos);

  void agregarProyecto(Proyecto proyecto) {
    proyectos!.toList().add(proyecto);
  }

  void _showModalSheet(
      context, GlobalKey<FormState> formKey, TextEditingController controller) {
    showModalBottomSheet(
        elevation: 5,
        clipBehavior: Clip.antiAliasWithSaveLayer,
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
        context: context,
        builder: (builder) {
          return Container();
        });
  }
}
