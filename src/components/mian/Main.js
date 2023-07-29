import './Main.css';

export default function Main({ children }) {
    return (
        <main className="movie-box-container">
            {children}
        </main>
    );
}

