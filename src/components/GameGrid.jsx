import GameCard from "./GameCard";

export default function GameGrid({ games, loading, startEdit, deleteGame }) {

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="grid">

            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                    startEdit={startEdit}
                    deleteGame={deleteGame}
                />
            ))}

        </div>
    );
}