export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="movie-image" />
            <div className="movie-details">
                <h2 className="movie-title">{movie.Title}</h2>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}
