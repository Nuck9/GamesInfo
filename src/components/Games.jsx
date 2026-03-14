import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Calendar, Monitor, Star, Search } from 'lucide-react';
import './Games.css';

export default function Games({ session }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      if (data) setGames(data);
    } catch (error) {
      console.error('Error al obtener juegos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar títulos o plataformas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-actions">
           <div className="user-profile">
             <div className="avatar">{session?.user?.email?.[0].toUpperCase()}</div>
             <span className="user-email">{session?.user?.email?.split('@')[0]}</span>
           </div>
           <button onClick={signOut} className="btn-logout" title="Cerrar Sesión">
             <LogOut size={20} />
           </button>
        </div>
      </header>

      <main className="games-container">
        <div className="section-header">
          <div className="header-content">
            <h2>Librería Digital</h2>
            <p>Explora la colección curada de títulos y plataformas de última generación.</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">{games.length}</span>
              <span className="stat-label">Juegos</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="pulse-loader"></div>
            <span>Sincronizando base de datos...</span>
          </div>
        ) : (
          <div className="grid">
            {filteredGames.length === 0 ? (
              <div className="no-results">
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otro término de búsqueda.</p>
              </div>
            ) : (
              filteredGames.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="card-media">
                    <img 
                      src={game.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'} 
                      alt={game.name} 
                      loading="lazy"
                    />
                    <div className="media-overlay">
                      <div className="rating-pill">
                        <Star size={14} fill="currentColor" />
                        <span>{game.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3>{game.name}</h3>
                    
                    <div className="platform-tags">
                      {game.platforms?.split(',').map((p, i) => (
                        <div key={i} className="platform-pill">
                          <Monitor size={12} />
                          <span>{p.trim()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-footer">
                      <div className="release-info">
                        <Calendar size={14} />
                        <span>
                          {game.released ? new Date(game.released).toLocaleDateString('es-ES', { 
                            month: 'short', 
                            year: 'numeric' 
                          }) : 'TBA'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
