# Specs — Spec-Driven Development

Todo cambio parte de una spec. Flujo obligatorio:

1. **Spec** (`specs/NN-*.md`): qué se construye y criterios de aceptación (`AC-x`).
2. **Plan** (`specs/tasks.md`): tareas trazables a los AC.
3. **Código**: se implementa solo lo que la spec describe.
4. **Verificación**: cada AC tiene una prueba automática (`src/**/*.test.tsx`) o una comprobación manual anotada en la spec.

Si el código y la spec divergen, se corrige la spec primero y luego el código.

| Spec | Contenido |
|---|---|
| [00-constitution](00-constitution.md) | Principios, stack, estructura, reglas no negociables |
| [01-design-system](01-design-system.md) | Tokens y componentes (fuente: `design-refs/design-md/bugatti/DESIGN.md`) |
| [02-routes-and-navigation](02-routes-and-navigation.md) | Mapa de rutas y navegación (18 pantallas) |
| [03-commerce-state](03-commerce-state.md) | Catálogo, carrito, favoritos, sesión |
| [04-pages](04-pages.md) | Contenido y criterios por pantalla, con su mockup de referencia |
| [tasks](tasks.md) | Plan de implementación y estado |
