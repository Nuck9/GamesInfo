import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

import Navbar from '../components/Navbar';
import GameForm from '../components/GameForm';
import GameGrid from '../components/GameGrid';

import "../styles/Games.css";

export default function Games() {

    
    
    // setGames es la LISTA que guarda tus 100 juegos traídos de la bodega (Supabase).
    const [games, setGames] = useState([]);
    
   
    const [loading, setLoading] = useState(true);
    
    
    const [searchTerm, setSearchTerm] = useState('');
    
    // para que la pantalla sepa dónde está el escritorio (formulario).
    const formRef = useRef(null);

    // newGame es tu MOLDE
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

    

    // FETCH: Trae todos los juegos de la bodega y los ordena por fecha de estreno.
    const fetchGames = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('released', { ascending: false });

        if (error) console.log(error);

        setGames(data || []); // Llenamos la lista con lo que llegó.
        setLoading(false); 
    };

    // LOGOUT
    const signOut = async () => {
        await supabase.auth.signOut();
    };

    // CREATE
    const createGame = async (e) => {
        e.preventDefault();

        await supabase.from('games').insert([newGame]);

        setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' }); 
        fetchGames(); // Refresca la estantería.
    };

    // DELETE
    const deleteGame = async (id) => {
        await supabase.from('games').delete().eq('id', id);
        fetchGames(); // Refresca la estantería.
    };

    // START EDIT
    const startEdit = (game) => {
        setEditingId(game.id); 
        setNewGame(game);      

        //mueve el scroll suavemente.
        const yOffset = -120;
        const element = formRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    };

    // UPDATE
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

    // CANCEL
    const cancelEdit = () => {
        setEditingId(null);
        setNewGame({ name: '', platforms: '', rating: '', released: '', image: '' });//LImpia el molde
    };

    
    
    // Aquí la LUPA busca nombres que coincidan con lo que escribiste.
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    return (
        <div className="layout">

            {/* MOSTRADOR: Control de búsqueda y salida */}
            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                signOut={signOut}
            />

            <main className="games-container">

                {/* ESCRITORIO: El formulario camaleón que crea o edita */}
                <GameForm
                    formRef={formRef}
                    newGame={newGame}
                    setNewGame={setNewGame}
                    editingId={editingId}
                    createGame={createGame}
                    updateGame={updateGame}
                    cancelEdit={cancelEdit}
                />

                {/* ESTANTERÍA: Muestra la lista de vitrinas ya filtradas */}
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