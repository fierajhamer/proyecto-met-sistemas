import { useState } from "react";
import "./Empleados.css";

export default function Empleados({ empleados, setEmpleados }) {
  const [nombreEmpleado, setNombreEmpleado] = useState("");

  const agregarEmpleado = () => {
    if (nombreEmpleado.trim()) {
      setEmpleados([
        ...empleados,
        { id: empleados.length + 1, nombre: nombreEmpleado },
      ]);
      setNombreEmpleado("");
    }
  };

  const manejarTeclaPresionada = (e) => {
    if (e.key === "Enter") {
      agregarEmpleado();
    }
  };

  return (
    <div className="Empleados-container">
      <div className="Empleados-form">
        <h1>Gestionar Empleados</h1>
        <input
          type="text"
          value={nombreEmpleado}
          onChange={(e) => setNombreEmpleado(e.target.value)}
          placeholder="Nombre del empleado"
          onKeyDown={manejarTeclaPresionada}
        />
        <button onClick={agregarEmpleado}>Agregar Empleado</button>
      </div>

      <div className="lista">
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado.id}>👮 {empleado.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
