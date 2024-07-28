import { useState } from 'react';
import newLogo from './assets/logo-negro.png'; // Ruta a tu nueva imagen
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';
import grupos from '../gruposLA.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);

  // Función para manejar el clic en el botón
  const handleButtonClick = (link) => {
    window.open(link, "_blank");
  };

  // Función para normalizar una cadena (eliminar tildes)
  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  // Función para manejar cambios en los checkboxes
  const handleYearChange = (event) => {
    const year = event.target.value;
    if (event.target.checked) {
      setSelectedYears([...selectedYears, year]);
    } else {
      setSelectedYears(selectedYears.filter(y => y !== year));
    }
  };

  // Obtener los años únicos de los grupos
  const uniqueYears = [...new Set(grupos.map(grupo => grupo.Año))];

  // Función para filtrar los grupos por nombre y año, ignorando tildes
  const filteredGrupos = grupos.filter((grupo) => {
    const matchesName = normalizeString(grupo.Nombre).includes(normalizeString(searchTerm));
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(grupo.Año);
    return matchesName && matchesYear;
  });

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={newLogo} className="logo react" alt="New logo" />
        </a>
      </div>
      <h1>Grupos de materias</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filters">
        <h2>Filtrar por Año</h2>
        <div className="checkbox-container">
          {uniqueYears.map((year, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                value={year}
                onChange={handleYearChange}
              />
              <label>{year}</label>
            </div>
          ))}
        </div>
      </div>
      <table className="group-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Semestre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredGrupos.map((grupo, index) => (
            <tr key={index}>
              <td className="name-cell">{grupo.Nombre}</td>
              <td>{grupo.Año}</td>
              <td>{grupo.Semestre}</td>
              <td>
                <button className="button-table" onClick={() => handleButtonClick(grupo.Link)}>
                  <FaWhatsapp style={{marginRight:"5px"}}/>
                  Ir al grupo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
