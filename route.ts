export function route(venues: number[], target: number): number[] {
    if (venues.length < 2) {
        throw new Error('Se necesitan al menos 2 venues');
    }

    if (target <= 0) {
        throw new Error('Target tiene que ser mayor que 0');
    }

    // Map paa guardar valor --> indice
    const map = new Map<number, number>();

    for (let i = 0; i < venues.length; i++) {
        const currentValue = venues[i];
        // El complemento es el valor que falta para llegar al target
        const complement = target - currentValue;

        if (currentValue <= 0) {
            throw new Error('Todos los valores tienen que ser mayores que 0');
        }

        // Si el complemento es menor o igual a 0, seguimos con el siguiente valor
        // Ya que todos los valores tienen que ser positivos
        if (complement <= 0) {
            continue;
        }

        // Buscar el indice del complemento en el map
        const complementIndex = map.get(complement);
        if (complementIndex !== undefined) {
            // Si encontramos el complemento, devolvemos los indices del par
            console.log(`Found pair: ${complementIndex}, ${i}`);
            return [complementIndex, i];
        }

        // Guardar el valor actual y su indice, en caso de que no exista en el map
        if (!map.has(currentValue)) {
            map.set(currentValue, i);
        }
    }

    // No se encontraron pares
    return [];
}