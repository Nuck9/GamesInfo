import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

import Navbar from '../components/Navbar';
import GameForm from '../components/GameForm';
import GameGrid from '../components/GameGrid';

import "../styles/Games.css";

export default function Games() {

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
        setLoading(true);

        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('released', { ascending: false });

        if (error) console.log(error);

        setGames(data || []);
        setLoading(false);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const createGame = async (e) => {
        e.preventDefault();

        await supabase.from('games').insert([newGame]);

        setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' });
        fetchGames();
    };

    const deleteGame = async (id) => {
        await supabase.from('games').delete().eq('id', id);
        fetchGames();
    };

    const startEdit = (game) => {
        setEditingId(game.id);
        setNewGame(game);

        const yOffset = -120;
        const element = formRef.current;

        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    };

    const updateGame = async (e) => {
        e.preventDefault();

        await supabase
            .from('games')
            .update(newGame)
            .eq('id', editingId);

        setEditingId(null);
        setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' });
        fetchGames();
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' });
    };

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="layout">

            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                signOut={signOut}
            />

            <main className="games-container">

                <GameForm
                    formRef={formRef}
                    newGame={newGame}
                    setNewGame={setNewGame}
                    editingId={editingId}
                    createGame={createGame}
                    updateGame={updateGame}
                    cancelEdit={cancelEdit}
                />

                <GameGrid
                    games={filteredGames}
                    loading={loading}
                    startEdit={startEdit}
                    deleteGame={deleteGame}
                />

            </main>

        </div>
    );
}