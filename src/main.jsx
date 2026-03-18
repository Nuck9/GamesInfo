/**
 * Punto de entrada de la aplicación (entry point)
 * 
 * Responsabilidad:
 * - Inicializar React en el DOM
 * - Renderizar el componente raíz (App)
 * - Activar herramientas de desarrollo (StrictMode)
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * createRoot:
 * - API moderna de React (React 18+)
 * - Permite habilitar características como renderizado concurrente
 * 
 * Se conecta al div con id="root" en el index.html
 */
createRoot(document.getElementById('root')).render(

  /**
   * StrictMode:
   * - Herramienta de desarrollo (no afecta producción)
   * - Detecta problemas potenciales en el código
   * - Ejecuta ciertos ciclos de vida dos veces intencionalmente
   *   para identificar efectos secundarios no controlados
   */
  <StrictMode>
    <App />
  </StrictMode>,

);