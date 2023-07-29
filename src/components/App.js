import { useEffect, useRef, useState } from 'react';
import NavBar from './navBar/NavBar';
import Main from './mian/Main';
import Box from './mian/Box';
import MovieCard from './mian/MovieCard';
import TempError from './mian/TempError';
import Loaded from './mian/Loaded';
import MovieDetails from './mian/MovieDetails';
import WatchingMoviesList from './mian/WatchedMovieList';

const key = '537f7a50';

function App() {
    // useStates, useRefs Hooks
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [watchedMovies, setWatchedMovies] = useState(() => {
        const sotredWatchedMovie =
            localStorage.getItem('watchedMovies') ?? '[]';

        return JSON.parse(sotredWatchedMovie);
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const buttonEl1 = useRef(null);
    const buttonEl2 = useRef(null);
    const boxEl = useRef(null);

    // Handle Functions
    function handleDeleteWatchedMovies(id) {
        setWatchedMovies(
            watchedMovies.filter((currEl) => currEl.imdbID !== id)
        );
    }
    // useEffects Hooks
    // fetching movies from the search
    useEffect(() => {
        const abortController = new AbortController();

        async function getMovie() {
            try {
                if (search.length < 3) {
                    setMovies([]);
                    setError('');
                    return;
                }
                setIsLoading(true);
                setError('');

                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${key}&s=${search}`,
                    { signal: abortController.signal }
                );
                if (!response.ok)
                    throw new Error('Network response was not ok');

                const data = await response.json();
                if (data.Response === 'False')
                    throw new Error('Movie not found!');

                setMovies([...data.Search]);
            } catch (err) {
                if (!abortController.signal.aborted) {
                    console.log(err.message);
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        setSelectedMovieId(null);
        getMovie();

        return () => abortController.abort();
    }, [search]);

    // local storage
    useEffect(() => {
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    }, [watchedMovies]);

    useEffect(() => {
        buttonEl1.current.addEventListener('click', callback);

        function callback() {
            boxEl.current.style.right = 0;
        }
    });
    useEffect(() => {
        buttonEl2.current.addEventListener('click', callback);

        function callback() {
            boxEl.current.style.right = '-100%';
        }
    });

    return (
        <>
            <NavBar search={search} setSearch={setSearch} />
            <Main>
                <Box>
                    <section className="fetching-movie-box">
                        <h2
                            style={{
                                textAlign: 'center',
                                marginBottom: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {' '}
                            searched movies{' '}
                        </h2>
                        {isLoading && <Loaded />}
                        {!error &&
                            !isLoading &&
                            movies.map((currEl) => (
                                <MovieCard
                                    movie={currEl}
                                    key={currEl.imdbID}
                                    onSelectedMovieId={() =>
                                        setSelectedMovieId(
                                            currEl.imdbID !== selectedMovieId
                                                ? currEl.imdbID
                                                : null
                                        )
                                    }
                                    selectedMovieId={selectedMovieId}
                                />
                            ))}
                        {error && <TempError> {error} </TempError>}
                    </section>
                </Box>

                <section className="box-container" ref={boxEl}>
                    <button className="close-btn" ref={buttonEl2}>
                        <i className="ri-arrow-right-fill"></i>
                    </button>
                    {selectedMovieId ? (
                        <MovieDetails
                            selectedMovieId={selectedMovieId}
                            onSelectedMovieId={setSelectedMovieId}
                            onWatchedMovies={setWatchedMovies}
                            watchedMoives={watchedMovies}
                        />
                    ) : (
                        <WatchingMoviesList
                            watchedMovies={watchedMovies}
                            onDeleteWatchedMovies={handleDeleteWatchedMovies}
                        />
                    )}
                </section>
            </Main>
            <button className="open-btn open" ref={buttonEl1}>
                <i className="ri-arrow-left-fill"></i>
            </button>
        </>
    );
}

export default App;
