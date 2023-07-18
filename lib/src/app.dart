import 'package:datafire/src/widgets/side_bar.dart';
import 'package:flutter/material.dart';
import 'package:sidebarx/sidebarx.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // This widget is the root of your application.
  final _controller = SidebarXController(selectedIndex: 0);
  final _key = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'DataFire',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: const Text('Hola!'),
                elevation: 6,
                action: SnackBarAction(
                  textColor: Colors.white,
                  label: 'Cerrar',
                  onPressed: () {
                    ScaffoldMessenger.of(context).hideCurrentSnackBar();
                  },
                )));
          },
          icon: const Icon(Icons.receipt),
          elevation: 8,
          label:
              Row(children: [Text('DataFire', style: TextStyle(fontSize: 15))]),
        ),
        body: Row(
          children: [
            SideBar(
              controller: _controller,
            ),
          ],
        ),
      ),
    );
  }
}
