type movieParams = {
    name: string;
    year: number;
    rating: number;
    genre: string[];
    poster: string;
    actors: string[];
};

function fetchWord(unformattedWord: any): movieParams {
    const word: movieParams = {
        name: unformattedWord.name,
        year: unformattedWord.year,
        rating: unformattedWord.rating,
        poster: unformattedWord.image_url,
        genre: unformattedWord.genre,
        actors: unformattedWord.actors,
    };
    return word;
}

export default fetchWord;
