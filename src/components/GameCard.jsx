import { Calendar, Monitor, Star, Trash2, Pencil } from 'lucide-react';

export default function GameCard({ game, startEdit, deleteGame }) {

    return (
        <div className="game-card">

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
    );
}