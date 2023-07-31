import './NavBar.css';

export default function NavBar({search, setSearch, boxEl}) {
    // useStates Hooks

    return (
        <nav className="navbar">
            <a href="/" className="navbar-logo">
                Film Flix
            </a>
            <input
                type="text"
                className="search-bar"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    boxEl.current.style.right = '-100%';
                }}
            />
        </nav>
    );
}
