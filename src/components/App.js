import { useEffect, useState } from 'react';
import NavBar from './navBar/NavBar';
import Main from './mian/Main';
import Box from './mian/Box';

const key = '537f7a50';

function App() {
    // useStates Hooks
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // useEffects Hooks
    useEffect(() => {
        const abortController = new AbortController();

        async function getMovie() {
            try {
                if (search.length < 3) {
                    setMovies([]);
                    return;
                }
                setIsLoading(true);
                setError('');
                const response = await fetch(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${search}`,
                    { signal: abortController.signal }
                );
                if (!response.ok)
                    throw new Error('Network response was not ok 🔴');

                const data = await response.json();
                if (data.Response === 'False')
                    throw new Error('Movie not found! 🔴');

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
        getMovie();

        return () => abortController.abort();
    }, [search]);

    return (
        <>
            <NavBar search={search} setSearch={setSearch} />
            <Main>
              <Box movies={movies} error={error} isLoading={isLoading}/>
            </Main>
        </>
    );
}

export default App;
