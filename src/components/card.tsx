import { ChevronDown, ChevronUp } from "lucide-react";
import { Fade, Grow } from "@mui/material";

type movieParams = {
    name: string;
    year: number;
    rating: number;
    genre: string[];
    poster: string;
    actors: string[];
    director: string;
    movie: any;
    isInResult: boolean;
};

function Card({ name, year, rating, poster, actors, genre, director, movie, isInResult }: movieParams) {
    const isYearClose = Math.abs(movie.year - year) <= 10 && movie.year !== year;
    const isRatingClose = Math.abs(movie.rating - rating) <= 0.3 && movie.rating !== rating;
    const correct = name !== movie.name ? false : true;
    const isYearCorrect = year === movie.year;
    const isRatingCorrect = rating === movie.rating;

    return (
        <>
            <Fade in={true} {...(true ? { timeout: 1400 } : {})}>
                <div className="card">
                    <img src={poster} alt="" />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <div className="info">
                            <div className="info-row">
                                <div className="description">
                                    <h2 className={isInResult ? "in-result" : ""}>Name</h2>
                                    <div className={correct ? "block name correct" : "block name"}>{name}</div>
                                </div>
                                <div className="description">
                                    <h2 className={isInResult ? "in-result" : ""}>Rating</h2>
                                    <div
                                        className={
                                            !isRatingClose
                                                ? isRatingCorrect
                                                    ? "block rating correct"
                                                    : "block rating"
                                                : "block rating close"
                                        }
                                    >
                                        {rating}{" "}
                                        {!isRatingCorrect && (rating > movie.rating ? <ChevronDown /> : <ChevronUp />)}
                                    </div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="description actors">
                                    <h2 className={isInResult ? "in-result" : ""}>Actors</h2>
                                    {actors.map((item, id) => {
                                        return (
                                            <div
                                                className={
                                                    movie.actors.includes(item) ? "block actor correct" : "block actor"
                                                }
                                                key={id}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="description">
                                    <h2 className={isInResult ? "in-result" : ""}>Director</h2>
                                    <div
                                        className={
                                            movie.director === director ? "block director correct" : "block director"
                                        }
                                    >
                                        {director}
                                    </div>
                                </div>
                                <div className="description">
                                    <h2 className={isInResult ? "in-result" : ""}>Year</h2>
                                    <div
                                        className={
                                            !isYearClose
                                                ? isYearCorrect
                                                    ? "block year correct"
                                                    : "block year"
                                                : "block year close"
                                        }
                                    >
                                        {year} {!isYearCorrect && (year > movie.year ? <ChevronDown /> : <ChevronUp />)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="description genres">
                            <h2 className={isInResult ? "in-result" : ""}>Genres</h2>
                            {genre.map((item, id) => {
                                return (
                                    <div
                                        key={id}
                                        className={movie.genre.includes(item) ? "block genre correct" : "block genre"}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Fade>
            <Grow in={!isInResult} {...(true ? { timeout: 400 } : {})}>
                <svg className="divider" height="5" viewBox="0 0 986 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <path d="M0.5 3H985.5" stroke="#9D5141" strokeWidth="5" strokeDasharray="28 28" />{" "}
                </svg>
            </Grow>
        </>
    );
}

export default Card;
