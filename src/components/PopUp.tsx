// @ts-nocheck

import Popup from "reactjs-popup";
import Card from "./card";
import { Fade } from "@mui/material";

type PopUpProps = {
    isGameOver: boolean;
    movie: {
        name: string;
        year: number;
        rating: number;
        genre: string[];
        poster: string;
        actors: string[];
        director: string;
    };
};

function PopUp({ isGameOver, movie }: PopUpProps) {
    return (
        <Popup open={isGameOver} modal nested>
            {(close) => {
                return (
                    <div className="popup">
                        <div className="result-window">
                            <Fade in={true} {...(true ? { timeout: 1900 } : {})}>
                                <h2 className="result">Today's movie is {movie.name}!</h2>
                            </Fade>
                            <div>
                                <Card
                                    name={movie.name}
                                    year={movie.year}
                                    rating={movie.rating}
                                    poster={movie.poster}
                                    actors={movie.actors}
                                    genre={movie.genre}
                                    director={movie.director}
                                    movie={movie}
                                    key={movie.name}
                                    isInResult={true}
                                />
                            </div>
                            <button className="close-button" onClick={() => close()}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-x"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            }}
        </Popup>
    );
}

export default PopUp;
