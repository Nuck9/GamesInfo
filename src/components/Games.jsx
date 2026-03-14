import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Games.css';

export default function Games({ session }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Error fetching games:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="layout">
      <header className="navbar">
        <div className="brand">
          <h1>Gaming Central</h1>
        </div>
        <div className="nav-actions">
           <span className="user-email">{session?.user?.email}</span>
           <button onClick={signOut} className="btn-logout">Sign Out</button>
        </div>
      </header>

      <main className="games-container">
        <div className="games-header">
          <h2>Database Browser</h2>
          <p>Explore all platforms and ratings in one place.</p>
        </div>

        {loading ? (
          <div className="loader">Loading games database...</div>
        ) : (
          <div className="grid">
            {games.length === 0 ? (
              <p className="no-data">No games found in the database.</p>
            ) : (
              games.map((game) => (
                <div key={game.id} className="game-card">
                  <div 
                    className="game-image" 
                    style={{ backgroundImage: `url(${game.image || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop'})` }}
                  ></div>
                  <div className="game-info">
                    <h3>{game.name}</h3>
                    <div className="game-meta">
                      <span className="platform">{game.platforms || 'Unknown'}</span>
                      <span className="rating">★ {game.rating || 'N/A'}</span>
                    </div>
                    {game.released && (
                      <div className="release-date">Released: {new Date(game.released).toLocaleDateString()}</div>
                    )}
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
