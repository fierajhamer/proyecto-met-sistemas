export const shuffleArray = (array) =>
  array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);

export const asignarDiasFrancos = (empleados) => 
  {
  const dias = Array.from({ length: 7 }, (_, i) => i);
  const diasAsignados = shuffleArray(dias);

  return empleados.map((empleado, index) => ({
    ...empleado,
    franco: diasAsignados[index % 7],
  }));
};
