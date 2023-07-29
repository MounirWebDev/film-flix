import React from 'react';

export default function WatchingMoviesList({ watchedMovies, }) {
    return (
        <div className="watching-movies-list">
            {watchedMovies.map((currEl) => (
                <WatchingMovie movie={currEl} key={currEl.imdbID}/>
            ))}
        </div>
    );
}

function WatchingMovie({ movie }) {
    return (
        <div key={movie.id} className="movie-item">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-details">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-ratings">
                    <div>
                        <span className="movie-rating-label">IMDb:</span>
                        <span style={{color: "#6c5ce7"}}>{movie.imdbRating}⭐</span>
                    </div>
                    <div>
                        <span className="movie-rating-label">Your Rating:</span>
                        <span style={{color: "#6c5ce7"}}>{movie.userRating}🌟</span>
                    </div>
                </div>
                <div className="movie-runtime">{movie.runtime}</div>
            </div>
            <span className='delete-movie-btn'>&times;</span>
        </div>
    );
}
