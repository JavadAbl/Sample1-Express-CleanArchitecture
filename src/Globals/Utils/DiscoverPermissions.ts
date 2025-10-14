export function discoverPermissions(controllers: any[]) {
  const grouped: Record<string, string[]> = {};

  for (const ControllerClass of controllers) {
    const controllerName = ControllerClass.name.replace("Controller", "").toLowerCase();
    const permissions = Reflect.getMetadata("permissions", ControllerClass) || [];
    grouped[controllerName] = permissions;
  }

  return grouped;
}
