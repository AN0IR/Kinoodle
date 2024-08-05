import data from "./components/data";
import { useEffect, useState } from "react";
import fetchWord from "./components/fetchWord";
import Card from "./components/card";
import SearchBar from "./components/searchbar";
import PopUp from "./components/PopUp";

type guessesParams = {
    id?: string;
    name: string;
    year: number;
    rating: number;
    genre: string[];
    poster: string;
    actors: string[];
};

const today: any = new Date();
const startDate: any = new Date("2024-08-04");
const diffTime = Math.abs(today - startDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const currentDate = new Date().toISOString().split("T")[0];

const getWordOfTheDay = () => {
    const onlyNewMovies = data.filter((item) => {
        return item.year >= 1980;
    });

    const unformattedWord = onlyNewMovies[diffDays % data.length];

    return fetchWord(unformattedWord);
};

function App() {
    const [movie, setMovie] = useState({
        name: "",
        year: 0,
        rating: 0,
        genre: [""],
        poster: "",
        actors: [""],
    });

    const [input, setInput] = useState<string>("");
    const [guesses, setGuesses] = useState<guessesParams[]>([]);
    const [guessCount, setGuessCount] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const fetchedMovie = getWordOfTheDay();
        const localGuesses = window.localStorage.getItem("guesses");
        const storedDate = window.localStorage.getItem("lastVisitDate");

        console.log(storedDate, currentDate);
        if (storedDate !== currentDate) {
            console.log("New day detected");
            setGuesses([]);
            setGuessCount(0);
            setIsGameOver(false);
        } else if (localGuesses !== null) {
            const parsedData = JSON.parse(localGuesses);
            setGuesses(parsedData.guesses);
            setGuessCount(parsedData.guessCount);
        }

        if (fetchedMovie) {
            setMovie(fetchedMovie);
        }

        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            if (window.localStorage.length === 0) {
                window.localStorage.setItem("guesses", JSON.stringify({ guesses: guesses, guessCount: guessCount }));

                return;
            }

            if (guesses.length === 0) {
                return;
            }

            if (guesses[guesses.length - 1].name === movie.name) {
                setIsGameOver(true);
            }

            window.localStorage.setItem(
                "guesses",
                JSON.stringify({ guesses: guesses, guessCount: guessCount, day: diffDays })
            );
            window.localStorage.setItem("lastVisitDate", currentDate);
        }
    }, [guesses, isInitialLoad]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    function handleClick() {
        data.filter((item) => {
            if (item.name === input) {
                const currentGuess: guessesParams = fetchWord(item);

                if (!guesses.some((item) => item?.name === currentGuess.name)) {
                    setGuesses((p) => [...p, currentGuess]);
                    setGuessCount((p) => p + 1);
                }

                if (currentGuess.name === movie.name) {
                    setTimeout(() => {
                        setIsGameOver(true);
                    }, 1000);
                }
            }
        });

        if (guessCount >= 9) {
            setTimeout(() => {
                setIsGameOver(true);
            }, 1500);
        }

        setInput("");
    }

    return (
        <>
            <h1>Kinoodle</h1>

            <SearchBar
                guessCount={guessCount}
                data={data}
                handleChange={handleChange}
                input={input}
                setInput={setInput}
                handleClick={handleClick}
                isGameOver={isGameOver}
            />

            <div className="board">
                {guesses.map((item) => {
                    return (
                        <Card
                            name={item.name}
                            year={item.year}
                            rating={item.rating}
                            poster={item.poster}
                            actors={item.actors}
                            genre={item.genre}
                            movie={movie}
                            key={item.name}
                            isInResult={false}
                        />
                    );
                })}
            </div>

            <PopUp isGameOver={isGameOver} movie={movie} />
        </>
    );
}

export default App;
