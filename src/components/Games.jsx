import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Calendar, Monitor, Star, Search, Trash2, Pencil } from 'lucide-react';
import './Games.css';

export default function Games({ session }) {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

  const [newGame, setNewGame] = useState({
    name: '',
    platforms: '',
    rating: '',
    released: '',
    image: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('released', { ascending: false });

      if (error) throw error;

      setGames(data || []);

    } catch (error) {
      console.error('Error cargando juegos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const createGame = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('games')
      .insert([newGame]);

    if (error) {
      console.error(error);
      return;
    }

    setNewGame({
      name: '',
      platforms: '',
      rating: '',
      released: '',
      image: ''
    });

    fetchGames();
  };

  const deleteGame = async (id) => {
    const confirmDelete = confirm("¿Eliminar este juego?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      return;
    }

    fetchGames();
  };

  // EDITAR + SCROLL
  const startEdit = (game) => {
    setEditingId(game.id);
    setNewGame(game);

    const yOffset = -100; // ajusta este número
    const element = formRef.current;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  };

  const updateGame = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('games')
      .update(newGame)
      .eq('id', editingId);

    if (error) {
      console.error(error);
      return;
    }

    setEditingId(null);

    setNewGame({
      name: '',
      platforms: '',
      rating: '',
      released: '',
      image: ''
    });

    fetchGames();
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (game.platforms && game.platforms.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="layout">

      <header className="navbar">

        <div className="brand">
          <h1>GAMING<span>BASE</span></h1>
        </div>

        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={signOut} className="btn-logout">
          <LogOut size={20} />
        </button>

      </header>

      <main className="games-container">

        {/* FORMULARIO */}
        <form
          ref={formRef}
          onSubmit={editingId ? updateGame : createGame}
          className="create-form"
        >

          <h2 style={{ marginBottom: '2rem', color: '#fbfbfb', fontSize: '1.8rem', fontWeight: '800' }}>
            {editingId ? 'Editar Juego' : 'Agregar Nuevo Juego'}
          </h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Nombre del juego</label>
              <input
                className="form-input"
                placeholder="Ej: The Witcher 3"
                value={newGame.name}
                onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Plataformas</label>
              <input
                className="form-input"
                placeholder="Ej: PC, PS5, Xbox Series X"
                value={newGame.platforms}
                onChange={(e) => setNewGame({ ...newGame, platforms: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Calificación</label>
              <input
                className="form-input"
                placeholder="Ej: 4.5"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={newGame.rating}
                onChange={(e) => setNewGame({ ...newGame, rating: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Fecha de lanzamiento</label>
              <input
                className="form-input"
                type="date"
                value={newGame.released}
                onChange={(e) => setNewGame({ ...newGame, released: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>URL de la imagen</label>
              <input
                className="form-input"
                placeholder="Ej: https://ejemplo.com/imagen.jpg"
                value={newGame.image}
                onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
              />
            </div>

          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button type="submit" className="btn-create">
              {editingId ? "Guardar Cambios" : "Crear Juego"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn-create"
                style={{ background: '#716969' }}
                onClick={() => {
                  setEditingId(null);
                  setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' });
                }}
              >
                Cancelar
              </button>
            )}
          </div>

        </form>

        {loading ? (
          <p>Cargando...</p>
        ) : (

          <div className="grid">

            {filteredGames.map((game) => (
              <div key={game.id} className="game-card">

                <div className="card-media">
                  <img src={game.image} alt={game.name} />

                  <div className="media-overlay">
                    <div className="rating-pill">
                      <Star size={14} />
                      {game.rating || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="card-content">

                  <h3>{game.name}</h3>

                  <div className="platform-tags">
                    {game.platforms && game.platforms.split(',').map((platform, idx) => (
                      <span key={idx} className="platform-pill">
                        <Monitor size={12} />
                        {platform.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">

                    <div className="release-info">
                      <Calendar size={14} />
                      {new Date(game.released).toLocaleDateString()}
                    </div>

                    <div className="card-actions">

                      <button
                        className="btn-edit"
                        onClick={() => startEdit(game)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => deleteGame(game.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}

      </main>

    </div>
  );
}