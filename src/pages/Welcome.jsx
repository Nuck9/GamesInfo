import '../styles/Welcome.css';

/**
 * Componente Welcome
 * 
 * Responsabilidad:
 * - Mostrar una pantalla de bienvenida inicial al usuario
 * - Explicar brevemente las funcionalidades del sistema
 * - Permitir continuar al flujo principal mediante una acción controlada
 * 
 * Nota para exposición:
 * Este componente es completamente presentacional (stateless),
 * ya que no maneja estado interno ni lógica de negocio.
 */
export default function Welcome({ onAccept }) {

  /**
   * onAccept:
   * - Función recibida por props desde un componente padre
   * - Permite controlar desde afuera cuándo el usuario
   *   deja la pantalla de bienvenida
   * 
   * Esto evita acoplar la navegación dentro del componente,
   * siguiendo un enfoque más flexible.
   */

  return (
    <div className="welcome-container">
      <div className="welcome-card">

        {/* =========================
            🔹 HEADER
        ========================= */}
        <div className="welcome-header">
          <h2>¡Bienvenido a GAMINGBASE!</h2>
          <p>Tu Catálogo Personal de Videojuegos</p>
        </div>

        {/* =========================
            🔹 CONTENIDO INFORMATIVO
        ========================= */}
        <div className="welcome-content">

          {/* Descripción general del sistema */}
          <p>
            GAMINGBASE es una base de datos centralizada donde puedes gestionar tu colección de videojuegos.
            Aquí podrás agregar, editar y eliminar juegos, explorar por plataformas y calificaciones,
            y mantener un registro organizado de tus títulos favoritos.
          </p>

          {/* Lista de funcionalidades principales */}
          <ul>
            <li>
              <strong>Agregar Juegos:</strong> Registra nuevos títulos con detalles como nombre, plataformas, calificación y fecha de lanzamiento.
            </li>
            <li>
              <strong>Buscar y Filtrar:</strong> Encuentra rápidamente juegos por nombre o plataforma.
            </li>
            <li>
              <strong>Editar Información:</strong> Actualiza los detalles de tus juegos en cualquier momento.
            </li>
            <li>
              <strong>Eliminar Juegos:</strong> Mantén tu catálogo limpio eliminando títulos que ya no necesites.
            </li>
          </ul>

          {/* Llamado a la acción */}
          <p>
            ¡Comienza a construir tu colección ahora mismo!
          </p>
        </div>

        {/* =========================
            🔹 ACCIÓN PRINCIPAL
        ========================= */}
        <button
          className="btn-accept"
          onClick={onAccept} // Delega el control al componente padre
        >
          Aceptar y Continuar
        </button>
      </div>
    </div>
  );
}