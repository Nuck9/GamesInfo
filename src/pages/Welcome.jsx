import '../styles/Welcome.css';

export default function Welcome({ onAccept }) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h2>¡Bienvenido a GAMINGBASE!</h2>
          <p>Tu Catálogo Personal de Videojuegos</p>
        </div>
        
        <div className="welcome-content">
          <p>
            GAMINGBASE es una base de datos centralizada donde puedes gestionar tu colección de videojuegos.
            Aquí podrás agregar, editar y eliminar juegos, explorar por plataformas y calificaciones,
            y mantener un registro organizado de tus títulos favoritos.
          </p>
          <ul>
            <li><strong>Agregar Juegos:</strong> Registra nuevos títulos con detalles como nombre, plataformas, calificación y fecha de lanzamiento.</li>
            <li><strong>Buscar y Filtrar:</strong> Encuentra rápidamente juegos por nombre o plataforma.</li>
            <li><strong>Editar Información:</strong> Actualiza los detalles de tus juegos en cualquier momento.</li>
            <li><strong>Eliminar Juegos:</strong> Mantén tu catálogo limpio eliminando títulos que ya no necesites.</li>
          </ul>
          <p>
            ¡Comienza a construir tu colección ahora mismo!
          </p>
        </div>
        
        <button className="btn-accept" onClick={onAccept}>
          Aceptar y Continuar
        </button>
      </div>
    </div>
  );
}