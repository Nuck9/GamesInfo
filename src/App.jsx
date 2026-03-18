import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './pages/Auth';
import Games from './pages/Games';
import Welcome from './pages/Welcome';

/**
 * Componente principal de la aplicación
 * 
 * Responsabilidad:
 * - Controlar el estado global de autenticación
 * - Gestionar el flujo principal de la aplicación (Auth → Welcome → Games)
 * - Escuchar cambios en la sesión del usuario
 * 
 */
function App() {

  // =========================
  // 🔹 ESTADOS GLOBALES
  // =========================

  // Guarda la sesión actual del usuario (null si no está autenticado)
  const [session, setSession] = useState(null);

  // Controla si la app está cargando la sesión inicial
  const [loading, setLoading] = useState(true);

  // Controla si se muestra la pantalla de bienvenida
  const [showWelcome, setShowWelcome] = useState(true);

  /**
   * useEffect inicial
   * 
   * Responsabilidades:
   * 1. Obtener la sesión actual al cargar la app
   * 2. Escuchar cambios de autenticación (login/logout)
   */
  useEffect(() => {

    // =========================
    // 🔹 OBTENER SESIÓN ACTUAL
    // =========================
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // =========================
    // 🔹 ESCUCHAR CAMBIOS DE AUTH
    // =========================
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {

      /**
       * Este listener permite actualizar automáticamente
       * la UI cuando el usuario:
       * - inicia sesión
       * - cierra sesión
       */
      setSession(session);
    });

    // =========================
    // 🔹 LIMPIEZA
    // =========================
    return () => subscription.unsubscribe();

  }, []);

  /**
   * Estado de carga inicial
   * 
   * Evita renderizar la app antes de conocer
   * si el usuario está autenticado o no
   */
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#0d1117',
          color: '#58a6ff'
        }}
      >
        Initializing App...
      </div>
    );
  }

  /**
   * Render principal
   * 
   * Flujo de la aplicación:
   * 1. Si NO hay sesión → muestra Auth
   * 2. Si hay sesión pero no ha aceptado → muestra Welcome
   * 3. Si hay sesión y ya aceptó → muestra Games
   */
  return (
    <>
      {
        !session
          ? <Auth session={session} />
          : showWelcome
            ? <Welcome onAccept={() => setShowWelcome(false)} />
            : <Games session={session} />
      }
    </>
  );
}

export default App;