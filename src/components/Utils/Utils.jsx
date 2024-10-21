export const shuffleArray = (array) =>
  array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);

export const asignarDiasFrancos = (empleados) => {
  const dias = [0, 1, 2, 3, 4, 5, 6];
  const diasAsignados = shuffleArray(dias);

  return empleados.map((empleado, index) => ({
    ...empleado,
    franco: diasAsignados[index % 7],
  }));
};
