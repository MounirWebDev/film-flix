export default function MovieCard({
    movie,
    selectedMovieId,
    onSelectedMovieId,
    boxEl,
}) {
    return (
        <div
            className={`movie-card ${
                selectedMovieId === movie.imdbID ? 'selected' : ''
            }`}
            onClick={() => {
                onSelectedMovieId();
                boxEl.current.style.right = 0;
            }}
        >
            <img
                src={movie.Poster}
                alt={movie.Title}
                className={`movie-image ${
                    selectedMovieId === movie.imdbID ? 'selected' : ''
                }`}
            />
            <div
                className={`movie-details ${
                    selectedMovieId === movie.imdbID ? 'selected' : ''
                }`}
            >
                <h2 className="movie-title">{movie.Title}</h2>
                <p>
                    <span>📅</span> {movie.Year}
                </p>
            </div>
        </div>
    );
}
