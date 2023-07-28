import MovieCard from './MovieCard';
import TempError from './TempError';
import Loaded from './Loaded';

export default function Box({ movies, error, isLoading }) {
    return (
        <section className="fetching-movie-box ">
            {isLoading && <Loaded />}
            {!error &&
                !isLoading &&
                movies.map((currEl) => (
                    <MovieCard movie={currEl} key={currEl.imdbID} />
                ))}
            {error && <TempError> {error} </TempError>}
        </section>
    );
}
