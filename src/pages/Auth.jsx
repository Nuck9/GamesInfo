import { useState } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/Auth.css';

export default function Auth({ session }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
        setIsLogin(true);
      }
    } catch (error) {
      const errorMsg = error.message === 'Invalid login credentials' 
        ? 'Credenciales de acceso inválidas' 
        : error.message;
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (session) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? 'Bienvenido de Nuevo' : 'Crear Cuenta'}</h2>
          <p>Base de Datos Central de Videojuegos</p>
        </div>
        
        <form onSubmit={handleAuth} className="auth-form">
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

          {message && <div className="auth-message">{message}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <button className="text-btn" onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
              {isLogin ? 'Regístrate ahora' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
