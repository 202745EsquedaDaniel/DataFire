import 'package:datafire/src/widgets/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:sidebarx/sidebarx.dart';

import '../../main.dart';

class SideBar extends StatefulWidget {
  SideBar({super.key, required this.controller});
  SidebarXController controller;
  // List<OrderM>? order = [];
  // IdModel? idmodel;
  @override
  State<SideBar> createState() => _SideBarState();
}

class _SideBarState extends State<SideBar> {
  @override
  Widget build(BuildContext context) {
    return SidebarX(
      controller: widget.controller,
      theme: SidebarXTheme(
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(boxShadow: const [
            BoxShadow(color: Colors.grey, blurRadius: 5, offset: Offset(0, 5))
          ], color: canvasColor, borderRadius: BorderRadius.circular(20)),
          textStyle: const TextStyle(color: colorIcon),
          selectedTextStyle: const TextStyle(color: colorIcon),
          itemDecoration: BoxDecoration(border: Border.all(color: canvasColor)),
          selectedItemDecoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: colorIcon.withOpacity(0.38)),
              color: selectColor,
              boxShadow: [
                BoxShadow(color: Colors.grey.withOpacity(0.5), blurRadius: 15)
              ]),
          iconTheme: const IconThemeData(color: unselectColor, size: 20)),
      extendedTheme: const SidebarXTheme(
          width: 200,
          selectedItemTextPadding: EdgeInsets.only(left: 10),
          itemTextPadding: EdgeInsets.only(left: 10),
          decoration: BoxDecoration(color: canvasColor, boxShadow: [
            BoxShadow(color: Colors.grey, blurRadius: 5, offset: Offset(0, 5))
          ]),
          margin: EdgeInsets.only(right: 10)),
      footerDivider: divider,
      headerBuilder: (_, extended) {
        //Cambiar accion de back por otra
        return SizedBox(
          height: 80,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: InkWell(
              focusColor: actionColor,
              highlightColor: actionColor,
              splashColor: accentCanvasColor,
              hoverColor: unselectColor.withOpacity(0.10),
              child: BackButton(
                onPressed: () {
                  //widget.idmodel = IdModel();
                  // widget.order!.clear();
                  //Navigator.pop(context);
                },
              ),
            ),
          ),
        );
      },
      //aqui se editan la cantidad de pestañas
      items: [
        SidebarXItem(
            icon: Icons.home,
            label: 'Inicio',
            onTap: () {
              debugPrint('Inicio');
            }),
        //const SidebarXItem(icon: Icons.area_chart_outlined, label: 'Estadisticas'),
        SidebarXItem(
            icon: Icons.assignment,
            label: 'Alta Proyectos',
            onTap: () {
              debugPrint('Alta Proyectos');
            }),
        SidebarXItem(
            icon: Icons.person_2,
            label: 'Alta Clientes ',
            onTap: () {
              debugPrint('Alta Clientes');
            }),
        SidebarXItem(
            icon: Icons.flag,
            label: 'Alta Trabajadores',
            onTap: () {
              debugPrint('Control');
            }),
        SidebarXItem(
            icon: Icons.account_balance,
            label: 'Balance',
            onTap: () {
              debugPrint('Balance');
            }),
      ],
    );
  }
}
