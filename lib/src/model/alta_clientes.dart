import 'alta_proyectos.dart';

class Clientes {
  String? nombre;
  List<Proyecto>? proyectos;

  Clientes(this.nombre, this.proyectos);

  void agregarProyecto(Proyecto proyecto) {
    proyectos!.toList().add(proyecto);
  }
}
