import { LogOut, Search } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, signOut }) {

    return (
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
    );
}