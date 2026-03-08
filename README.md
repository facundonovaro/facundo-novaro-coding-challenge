# Route Function

## Descripción

La función `route` recibe una lista de `venues` (números) y un `target` (número). El objetivo es devolver un par de índices de la lista cuyos valores sumen exactamente el `target`.

La funcion va a recorrer la lista de venues y va a parar en cuanto haya encontrado un venue que, sumado a alguno de los ya procesados, sea igual al target.

## Requisitos

- Los `venues` y el `target` son números enteros **mayores que cero**.

## Validaciones

En los siguientes casos se devuelve un error:

- Si `target` es menor o igual a cero → Error: "Target tiene que ser mayor que 0"
- Si la lista de `venue` tiene menos de 2 elementos -> Error: "Se necesitan al menos 2 venues"
- Si algún `venue` (venues[i]) es menor o igual a cero → Error: "Todos los valores tienen que ser mayores que 0"

## Algoritmo

### Implementación con Map

Se genera un `Map` donde se van guardando los `venues[i]` con el índice correspondiente, con las siguientes condiciones:

1. **Validación de complemento**: Si `target - venues[i]` es menor o igual a cero, no se guarda el valor, porque eso indica que se necesitaría de un segundo venue menor o igual a cero para completar, y los venues tienen que ser mayores que cero.

2. **Evitar duplicados**: Si el valor ya se encuentra en el Map, entonces no se vuelve a guardar. No es necesario tener guardado el mismo valor con dos índices distintos.

3. **Búsqueda de par**: Antes de guardar los valores en el Map, se verifica si `target - venues[i]` es igual a algún valor ya guardado en el Map. Si es así, entonces se devuelve el par con los índices correspondientes.

## Ejemplos

```typescript
// Ejemplo 1: Par encontrado
route([2, 7, 11, 15], 9)  // Retorna: [0, 1] (2 + 7 = 9)

// Ejemplo 2: Valores duplicados
route([50, 50], 100)      // Retorna: [0, 1] (50 + 50 = 100)

// Ejemplo 3: No se encuentra par
route([1, 2, 3], 10)      // Retorna: [] (no hay par que sume 10)

// Ejemplo 4: Array vacío
route([], 5)              // Lanza error

// Ejemplo 5: Error - target inválido
route([1, 2, 3], 0)        // Lanza error

// Ejemplo 6: Error - venue inválido
route([1, -2, 3], 4)      // Lanza error
```

## Complejidad

- **Tiempo**: O(n) - Una sola pasada por el array
- **Espacio**: O(n) - En el peor caso, se almacenan todos los valores únicos en el Map

## Test utils

Function expect que devuelve objeto con funcitons toEqual y toThrow (esta ultima se usa con una funcion)

- toEqual compara el resultado de la funcion con el valor esperado
- toThrow ejecuta la funcion y espera recibir un error, y compara el texto. Falla si no se recibio un error o si el mensaje no es igual


## Correr los tests

```
npm run test
```