export default function GameForm({
    formRef,
    newGame,
    setNewGame,
    editingId,
    createGame,
    updateGame,
    cancelEdit
}) {

    return (
        <form
            ref={formRef}
            onSubmit={editingId ? updateGame : createGame}
            className="create-form"
        >

            <h2 className="form-title">
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
                        placeholder="Ej: PC, PS5"
                        value={newGame.platforms}
                        onChange={(e) => setNewGame({ ...newGame, platforms: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label>Calificación</label>
                    <input
                        className="form-input"
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
                        placeholder="https://..."
                        value={newGame.image}
                        onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
                    />
                </div>

            </div>

            <div className="form-actions">

                <button type="submit" className="btn-create">
                    {editingId ? "Guardar Cambios" : "Crear Juego"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        className="btn-create cancel-btn"
                        onClick={cancelEdit}
                    >
                        Cancelar
                    </button>
                )}

            </div>

        </form>
    );
}