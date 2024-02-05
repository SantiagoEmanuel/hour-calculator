import { useState } from "react"

function App() {

  const [hour, setHour] = useState()

  const addHours = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    // Validar si los campos de ingreso o egreso están vacíos
    if (e.target.ingreso.value === "" || e.target.egreso.value === "") {
      return alert('Ingrese un valor');
    }

    // Convertir los valores de entrada a números
    const ingreso = convertToMinutes(e.target.ingreso.value);
    const egreso = convertToMinutes(e.target.egreso.value);

    // Validar si los valores ingresados son numéricos
    if (isNaN(ingreso) || isNaN(egreso)) {
      return alert('Ingrese valores numéricos');
    }

    // Calcular la diferencia en minutos
    const minutesDifference = egreso - ingreso;

    // Validar si la hora de egreso es posterior a la hora de ingreso
    if (minutesDifference < 0) {
      return alert('La hora de egreso debe ser posterior a la hora de ingreso');
    }

    // Convertir la diferencia de minutos a horas y minutos
    const hours = Math.floor(minutesDifference / 60);
    const remainingMinutes = minutesDifference % 60;

    // Obtener las horas almacenadas en el localStorage
    const storedHours = parseFloat(localStorage.getItem('totalHours')) || 0;

    // Sumar las horas calculadas con las almacenadas
    const totalHours = storedHours + hours + remainingMinutes / 60;

    // Almacenar el nuevo total de horas en el localStorage
    localStorage.setItem('totalHours', totalHours);

    let [h, m] = totalHours.toFixed(2).toString().split(".")
    m = parseFloat(m)
    m = (m * 60) / 100
    if (m < 10) {
      m = `0${m}`
    }

    // Mostrar el total de horas en la pagina
    const span = document.getElementById("hora")
    span.innerHTML = " " + h + ":" + m + " hs"
  };

  // Función para convertir una cadena de tiempo (HH:MM) a minutos
  const convertToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('totalHours');
    console.log('LocalStorage limpiado.');

    const span = document.getElementById("hora")
    span.innerHTML = " 00:00 hs"
  };

  return (
    <div className="container">
      <header>
        <h1>Calculadora de Horas</h1>
      </header>
      <main>
        <form onSubmit={addHours}>
          <label>
            <input type="text" name="ingreso" required placeholder="Hora de ingreso" autoComplete="false" />
          </label>
          <label>
            <input type="text" name="egreso" required placeholder="Hora de egreso" autoComplete="false" />
          </label>
          <button>Calcular</button>
        </form>
        <div>
          <p>Total de horas:
            <span id="hora">
              00:00 hs
            </span>
          </p>
        </div>
        <button className="clearLS" onClick={clearLocalStorage}>Limpiar horario.</button>
      </main>
    </div>
  )
}

export default App
