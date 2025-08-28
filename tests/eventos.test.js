// Test básico para verificar que Jest funciona
describe('Suite de pruebas de eventos', () => {
  test('Prueba básica de suma', () => {
    expect(1 + 1).toBe(2);
  });

  test('Prueba de strings', () => {
    expect('evento').toContain('vent');
  });
});