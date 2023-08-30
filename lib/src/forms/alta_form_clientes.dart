import 'package:flutter/material.dart';
import '../model/data.dart';
import '../widgets/colors.dart';

//Por hacer
//Seguir agregando los campos para guardar

class AltaClientePage extends StatefulWidget {
  @override
  _AltaClientePageState createState() => _AltaClientePageState();
}

class _AltaClientePageState extends State<AltaClientePage> {
  final _formKey = GlobalKey<FormState>();
  final _id = TextEditingController();
  final _nombre = TextEditingController();
  final _apellido = TextEditingController();
  final _nombreController = TextEditingController();

  List<Clientes> clientes = [];

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: [
          Container(
              height: 100,
              decoration: const BoxDecoration(
                  color: accentCanvasColor,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      bottomLeft: Radius.circular(20)))),
          Container(
              padding: const EdgeInsets.all(15),
              child: const Text(
                'Clientes',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 28),
              )),
          Container(
            padding: const EdgeInsets.only(top: 55, left: 15),
            width: size.width > 600 ? size.width * 0.8 : 500,
            child: const Text(
              'Aqui dara de alta sus clientes',
              style: TextStyle(fontSize: 20),
            ),
          ),
          formview(context)
        ],
      ),
    );
  }

  Container formview(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 150, left: 15),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: _nombreController,
              decoration: InputDecoration(
                labelText: 'Nombre del Cliente',
              ),
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Por favor, ingresa el nombre del cliente';
                }
                return null;
              },
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  String nombreCliente = _nombreController.text;
                  // Lógica para dar de alta el cliente
                  // Puedes llamar a una función o realizar cualquier otra acción aquí
                  print('Cliente dado de alta: $nombreCliente');
                  Navigator.pop(context);
                }
              },
              child: Text('Guardar'),
            ),
          ],
        ),
      ),
    );
  }

  void crearClienteConProyecto(
      String nombreP, String descripcion, String nombreC) {
    int id = Proyecto().crearId();
    var proyecto = Proyecto();
    var cliente = Clientes(nombreP, id);
    clientes.add(cliente);
  }

  void crearCliente() {}
}
