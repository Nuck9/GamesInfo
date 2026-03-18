import { useState } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/Auth.css';

/**
 * Componente Auth
 * 
 * Responsabilidad:
 * - Manejar autenticación de usuarios (login y registro)
 * - Gestionar estado del formulario (email, password)
 * - Mostrar mensajes de éxito/error al usuario
 * 
 */
export default function Auth({ session }) {

  // =========================
  // 🔹 ESTADOS DEL COMPONENTE
  // =========================

  // Indica si hay una petición en curso (para deshabilitar botón y evitar múltiples envíos)
  const [loading, setLoading] = useState(false);

  // Datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Controla si estamos en modo login o registro
  const [isLogin, setIsLogin] = useState(true);

  // Mensaje de feedback al usuario (errores o éxito)
  const [message, setMessage] = useState('');

  /**
   * Función principal de autenticación
   * 
   * Flujo:
   * 1. Previene recarga del formulario
   * 2. Activa estado de carga
   * 3. Decide si hace login o registro
   * 4. Maneja errores
   * 5. Finaliza estado de carga
   */
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {

      // =========================
      // 🔹 LOGIN
      // =========================
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        // Si Supabase devuelve error → se lanza excepción
        if (error) throw error;

      }

      // =========================
      // 🔹 REGISTRO
      // =========================
      else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) throw error;

        // Feedback al usuario
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');

        // Cambia automáticamente a modo login
        setIsLogin(true);
      }

    } catch (error) {

      /**
       * Manejo de errores
       * 
       * Se traduce el mensaje técnico de Supabase a uno más amigable
       */
      const errorMsg = error.message === 'Invalid login credentials'
        ? 'Credenciales de acceso inválidas'
        : error.message;

      setMessage(errorMsg);

    } finally {

      // Siempre se ejecuta → evita que el botón quede bloqueado
      setLoading(false);
    }
  };

  /**
   * Si ya existe sesión activa → no se muestra el componente
   * 
   * Esto evita que usuarios logueados vean el formulario
   */
  if (session) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* =========================
            🔹 HEADER
        ========================= */}
        <div className="auth-header">
          <h2>{isLogin ? 'Bienvenido de Nuevo' : 'Crear Cuenta'}</h2>
          <p>Base de Datos Central de Videojuegos</p>
        </div>

        {/* =========================
            🔹 FORMULARIO
        ========================= */}
        <form onSubmit={handleAuth} className="auth-form">

          {/* EMAIL */}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="gamer@ejemplo.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña segura"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* MENSAJE DE ERROR / ÉXITO */}
          {message && <div className="auth-message">{message}</div>}

          {/* BOTÓN PRINCIPAL */}
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading
              ? 'Procesando...'
              : isLogin
                ? 'Entrar'
                : 'Registrarse'}
          </button>
        </form>

        {/* =========================
            🔹 CAMBIO LOGIN / REGISTER
        ========================= */}
        <div className="auth-footer">
          <p>
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}

            <button
              className="text-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(''); // limpia errores al cambiar modo
              }}
            >
              {isLogin ? 'Regístrate ahora' : 'Inicia sesión'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}