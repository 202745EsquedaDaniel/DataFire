import 'package:flutter/material.dart';
import 'package:sidebarx/sidebarx.dart';

class MotherView extends StatelessWidget {
  const MotherView({super.key, required this.controller});
  final SidebarXController controller;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    var size = MediaQuery.of(context).size;
    return AnimatedBuilder(
        animation: controller,
        builder: (ctx, child) {
          switch (controller.selectedIndex) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            default:
              return Text(
                'Not Found Page',
                style: theme.textTheme.headlineSmall,
              );
          }
        });
  }
}
