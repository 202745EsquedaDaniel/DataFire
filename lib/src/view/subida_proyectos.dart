import 'package:flutter/material.dart';

import '../widgets/colors.dart';

//En esta seccion se hacen alta de proyectos

//hay que levantar un proyecto y casarlo a un cliente

// Seccion de trabajadores

class AltaProyectos extends StatelessWidget {
  const AltaProyectos({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
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
                'Alta Proyectos',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              )),
          Container(
            padding: const EdgeInsets.only(top: 55, left: 10),
            width: size.width > 600 ? size.width * 0.8 : 500,
            child: Text('Es una prueba'),
          ),
        ],
      ),
    );
  }
}
