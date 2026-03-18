# GamesInfo 🎮

**GamesInfo** es una aplicación web moderna diseñada para gestionar y organizar una colección personal de videojuegos. Permite a los usuarios llevar un registro detallado de sus títulos favoritos, incluyendo plataformas, calificaciones y fechas de lanzamiento.

## 🚀 Características Principales

- **Gestión Completa (CRUD):** Añade, visualiza, edita y elimina videojuegos de tu biblioteca de forma sencilla.
- **Autenticación Segura:** Sistema de inicio de sesión y registro integrado mediante **Supabase Auth**.
- **Búsqueda Inteligente:** Filtra tus juegos en tiempo real por nombre para encontrar rápidamente lo que buscas.
- **Interfaz Moderna:** Diseño receptivo (responsive) y atractivo, optimizado para una excelente experiencia de usuario.
- **Persistencia de Datos:** Todos los cambios se sincronizan en tiempo real con una base de datos en la nube.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Base de Datos y Auth:** [Supabase](https://supabase.com/)
- **Estilos:** CSS Vanilla (Custom Properties y Flexbox/Grid)
- **Iconos:** Lucide React (o similares según implementación)

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- Una cuenta en [Supabase](https://supabase.com/) para configurar la base de datos.

## ⚙️ Configuración

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_llave_anonima
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---
Desarrollado con ❤️ para los amantes de los videojuegos.
