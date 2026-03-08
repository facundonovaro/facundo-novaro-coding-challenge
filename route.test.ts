import { test, expect, runTests } from './test-utils.js';
import { route } from './route.js';

// Test cases
test('Caso basico: encontrar un par', () => {
    const result = route([2, 7, 11, 15], 9);
    expect(result).toEqual([0, 1]);
});

test('Par con valores duplicados', () => {
    const result = route([50, 50], 100);
    expect(result).toEqual([0, 1]);
});

test('No se encontro par', () => {
    const result = route([1, 2, 3], 10);
    expect(result).toEqual([]);
});

test('Sin venues', () => {
    expect(() => route([], 5)).toThrow('Se necesitan al menos 2 venues');
});

test('Un solo venue', () => {
    expect(() => route([5], 10)).toThrow('Se necesitan al menos 2 venues');
});

test('Target igual a cero', () => {
    expect(() => route([1, 2, 3], 0)).toThrow('Target tiene que ser mayor que 0');
});

test('Venue negativo', () => {
    expect(() => route([1, -2, 3], 4)).toThrow('Todos los valores tienen que ser mayores que 0');
});


test('Target menor que el menor venue', () => {
    const result = route([10, 20, 30], 5);
    expect(result).toEqual([]);
});

test('Target mayor que el mayor venue pero menor que el doble del mayor', () => {
    const result = route([10, 20, 30], 50);
    expect(result).toEqual([1, 2]);
});

test('Target mayor que el doble del mayor venue', () => {
    const result = route([10, 20, 30], 100);
    expect(result).toEqual([]);
});

test('El resultado siempre tiene que tener dos indices', () => {
    const result1 = route([1, 7, 1, 2], 9);
    expect(result1.length).toEqual(2);

    const result2 = route([50, 50], 100);
    expect(result2.length).toEqual(2);

    const result3 = route([3, 2, 4], 6);
    expect(result3.length).toEqual(2);

    const result4 = route([1000, 2000, 3000], 5000);
    expect(result4.length).toEqual(2);
});

test('Los indices no se repiten y manejan valores iguales en indices diferentes', () => {
    const result1 = route([10, 20, 10, 30], 20);
    expect(result1.length).toEqual(2);
    if (result1[0] === result1[1]) {
        throw new Error(`Indices should not be repeated, but got [${result1[0]}, ${result1[1]}]`);
    }
    expect(result1).toEqual([0, 2]);

    const result2 = route([5, 5, 5, 10], 10);
    expect(result2.length).toEqual(2);
    if (result2[0] === result2[1]) {
        throw new Error(`Indices should not be repeated, but got [${result2[0]}, ${result2[1]}]`);
    }
    expect(result2).toEqual([0, 1]);
});

test('Existen multiples pares pero solo se devuelve el primero que se encuentra', () => {
    const result1 = route([2, 7, 3, 6, 11, 15], 9);
    expect(result1).toEqual([0, 1]);

    const result2 = route([1, 2, 8, 4, 3], 5);
    expect(result2).toEqual([0, 3]);

    const result3 = route([10, 20, 30, 40], 50);
    expect(result3).toEqual([1, 2]);
});

runTests();
