import { useEffect, useState } from 'react';
import UserRating from './UserRating';
import Loaded from './Loaded';

const key = '537f7a50';

export default function MovieDetails({
    selectedMovieId,
    onWatchedMovies,
    onSelectedMovieId,
    watchedMoives,
}) {
    // useStates Hooks
    const [movieDetails, setMovieDetails] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Normal Variables
    const {
        Title: title,
        Poster: image,
        Year: year,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Genre: genre,
        Director: director,
        imdbID,
    } = movieDetails;

    const isWatched = watchedMoives.some(
        (currEl) => currEl.imdbID === selectedMovieId
    );

    // Handle Functions
    function addWatchedMovies() {
        const newWatchedMoive = {
            imdbID,
            title,
            image,
            imdbRating,
            runtime,
            userRating,
        };

        onWatchedMovies((pre) => [...pre, newWatchedMoive]);
        onSelectedMovieId(null);
    }

    // useEffects Hooks
    useEffect(() => {
        async function getDetails() {
            setIsLoading(true);
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
            );
            const data = await response.json();
            setIsLoading(false);
            setMovieDetails({ ...data });
        }

        getDetails();
    }, [selectedMovieId]);

    return (
        <section className="movie-detail-box">
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '15px',
                    textTransform: 'uppercase',
                }}
            >
                movie details
            </h2>
            {isLoading ? (
                <Loaded />
            ) : (
                <>
                    <img src={image} alt={title} className="movie-image" />
                    <h2 className="movie-title">
                        {title}{' '}
                        <span
                            role="img"
                            aria-label="Movie Emoji"
                            className="movie-emoji"
                        >
                            🎬
                        </span>
                    </h2>
                    <div className="movie-info">
                        <div className="movie-info-item">
                            <span className="movie-info-label">Year: </span>
                            <span>{year}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                📅
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">Runtime: </span>
                            <span>{runtime}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                ⌛
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">
                                IMDb Rating:{' '}
                            </span>
                            <span>{imdbRating}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                ⭐
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">Released: </span>
                            <span>{released}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                📽️
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">Actors: </span>
                            <span>{actors}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                🧑🎭
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">Director: </span>
                            <span>{director}</span>
                            <span
                                role="img"
                                aria-label="Movie Emoji"
                                className="movie-emoji"
                            >
                                📽️
                            </span>
                        </div>
                        <div className="movie-info-item">
                            <span className="movie-info-label">Genre: </span>
                            <span>{genre}</span>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: '10px',
                            background: '#333',
                            padding: '.75rem',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isWatched ? (
                            <p className="added-message">
                                You have already added this movie to your list.
                                Check it out!
                            </p>
                        ) : !isWatched && userRating ? (
                            <>
                                <UserRating
                                    userRating={userRating}
                                    setUserRating={setUserRating}
                                />
                                <button
                                    className="add-to-list-button"
                                    onClick={addWatchedMovies}
                                >
                                    Add to List
                                </button>
                            </>
                        ) : (
                            <UserRating
                                userRating={userRating}
                                setUserRating={setUserRating}
                            />
                        )}
                    </div>
                    <p className="movie-plot">{plot}</p>
                </>
            )}
        </section>
    );
}
