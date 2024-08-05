import { ChangeEventHandler } from "react";

type SearchBarProps = {
    data: any;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    setInput: (input: string) => void;
    input: string;
    handleClick: () => void;
    guessCount: number;
    isGameOver: boolean;
};

type guessesParams = {
    id: string;
    name: string;
    year: number;
    rating: number;
    genre: string[];
    poster: string;
    actors: string[];
};

function SearchBar({ data, handleChange, setInput, input, handleClick, guessCount, isGameOver }: SearchBarProps) {
    return (
        <>
            <p className="guessCount">{guessCount} / 10 guesses</p>
            <div className="search-block">
                <input
                    disabled={isGameOver}
                    placeholder="Type a movie name..."
                    className="searchbar"
                    type="text"
                    value={input}
                    onChange={handleChange}
                />
                <div className="dropdown">
                    {data
                        .filter((item: guessesParams) => {
                            const searthTerm = input.toLowerCase();
                            const name = item.name.toLowerCase();
                            return searthTerm && name.includes(searthTerm) && name !== searthTerm;
                        })
                        .map((item: guessesParams) => (
                            <div
                                onClick={() => {
                                    setInput(item.name);
                                }}
                                className="dropdown-row"
                                key={item.name}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
                <button className="submit-button" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </>
    );
}

export default SearchBar;
