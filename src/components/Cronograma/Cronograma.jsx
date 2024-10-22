import { useState } from "react";
import { asignarDiasFrancos, shuffleArray } from "../Utils/utils";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");
import "./Cronograma.css";

export default function Cronograma({ empleados, objetivos }) {
  const [cronograma, setCronograma] = useState([]);

  const obtenerPrimerDia = () => {
    const hoy = dayjs();
    const diasHastaLunes = (8 - hoy.day()) % 7;
    return hoy.add(diasHastaLunes, "day");
  };

  const generarCronograma = () => {
    if (empleados.length === 0) {
      return;
    }

    const empleadosConFrancos = asignarDiasFrancos(empleados);
    const nuevoCronograma = [];
    const lunes = obtenerPrimerDia();

    for (let i = 0; i < 7; i++) {
      const diaActual = lunes.add(i, "day");
      const empleadosDisponibles = empleadosConFrancos.filter(
        (empleado) => empleado.franco !== i
      );

      const asignacionesPorDia = objetivos.map((objetivo) => {
        let empleadosAleatorios = shuffleArray(empleadosDisponibles);
      
        return {
          objetivo: objetivo.lugar,
          turnos: ["🏙️", "🌇", "🌆"].map((turno, j) => ({
            turno,
            empleado:
              empleadosAleatorios[j % empleadosAleatorios.length]?.nombre || "Sin asignar",
          })),
        };
      });

      nuevoCronograma.push({
        dia: diaActual.format("dddd DD/MM"),
        asignaciones: asignacionesPorDia,
      });
    }

    setCronograma(nuevoCronograma);
  };

  return (
    <div className="Cronograma-container">
      <div className="title">
        <h1>Cronograma Semanal</h1>
        <span>Turnos: Mañana🏙️, tarde🌇, y noche🌆</span>
      </div>

      <button onClick={generarCronograma}>Generar Cronograma</button>

      <div className="tabla-cronograma">
        {cronograma.length > 0 && (
          <table border="1" style={{ marginTop: "10px", width: "100%" }}>
            <thead>
              <tr>
                <th>Día</th>
                {objetivos.map((objetivo) => (
                  <th key={objetivo.id}>{objetivo.lugar}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cronograma.map((dia, i) => (
                <tr key={i}>
                  <td>{dia.dia}</td>
                  {dia.asignaciones.map((asig, j) => (
                    <td key={j}>
                      {asig.turnos.map((t, k) => (
                        <div key={k}>
                          <strong>{t.turno}:</strong> {t.empleado}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
