import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cronograma from './components/Cronograma/Cronograma';
import Empleados from './components/Empleados/Empleados';
import Objetivos from './components/Objetivos/Objetivos';
import "./App.css";

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [objetivos, setObjetivos] = useState([]);

  return (
    <Router>
      <nav>
        <Link to="/cronograma">Cronograma</Link>
        <Link to="/">Empleados</Link>
        <Link to="/objetivos">Objetivos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Empleados empleados={empleados} setEmpleados={setEmpleados} />} />
        <Route path="/cronograma" element={<Cronograma empleados={empleados} objetivos={objetivos} />} />
        <Route path="/objetivos" element={<Objetivos objetivos={objetivos} setObjetivos={setObjetivos} />} />
      </Routes>
    </Router>
  );
}

export default App;
