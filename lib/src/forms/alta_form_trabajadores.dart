import 'package:flutter/material.dart';

import '../widgets/colors.dart';

class AltaTrabajadorPage extends StatefulWidget {
  @override
  _AltaTrabajadorPageState createState() => _AltaTrabajadorPageState();
}

class _AltaTrabajadorPageState extends State<AltaTrabajadorPage> {
  final _formKey = GlobalKey<FormState>();
  final _nombreController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          validation(context);
        },
        icon: const Icon(Icons.add),
        elevation: 8,
        label: Row(
            children: [Text('Añadir Nuevo', style: TextStyle(fontSize: 15))]),
      ),
      body: Stack(
        children: [
          Container(
              height: 100,
              decoration: const BoxDecoration(
                  color: accentCanvasColor,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      bottomLeft: Radius.circular(20)))),
          Row(
            children: [
              Container(
                padding: EdgeInsets.only(top: 30),
                child: BackButton(onPressed: () {
                  Navigator.pop(context);
                }),
              ),
              Container(
                  padding: const EdgeInsets.all(15),
                  child: const Text(
                    'Trabajadores',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 28),
                  )),
            ],
          ),
          Container(
            padding: const EdgeInsets.only(top: 55, left: 55),
            width: size.width > 600 ? size.width * 0.8 : 500,
            child: Text(
              'Aqui dara de alta a sus empleados',
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
      padding: const EdgeInsets.only(top: 120, left: 15),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: _nombreController,
              decoration: InputDecoration(
                labelText: 'Nombre del Empleado',
              ),
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Por favor, ingresa el nombre del cliente';
                }
                return null;
              },
            ),
          ],
        ),
      ),
    );
  }

  void validation(BuildContext context) {
    if (_formKey.currentState!.validate()) {
      String nombreCliente = _nombreController.text;
      // Lógica para dar de alta el cliente
      // Puedes llamar a una función o realizar cualquier otra acción aquí
      print('Trabajador dado de alta: $nombreCliente');
      Navigator.pop(context);
    }
  }
}
