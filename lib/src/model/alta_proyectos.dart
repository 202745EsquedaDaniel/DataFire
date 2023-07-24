import 'package:datafire/src/model/alta_clientes.dart';
import 'package:datafire/src/model/alta_trabajadores.dart';

class Proyecto {
  String nombre;
  String descripcion;
  Clientes? cliente;
  List<Trabajadores>? trabajadores;

  Proyecto(this.nombre, this.descripcion, {this.cliente, this.trabajadores});
}
