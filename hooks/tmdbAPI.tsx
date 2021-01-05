export interface genre {
    id: string,
    name: string,
}

export interface movie {
    id: string,
    backdrop_path: string,
    poster_path: string,
    genre_ids: Array<string>,
    original_title: string,
    title: string,
    overview: string,
    original_language: string,
    release_date: string,
}

export interface tvShow {
    id: string,
    backdrop_path: string,
    poster_path: string,
    genre_ids: Array<string>,
    original_name: string,
    name: string,
    overview: string,
    original_language: string,
    release_date: string,
}

export async function searchMovie(searchQuery: string) {
    try {
        let response = await fetch(process.env.TMDB_API_BASE_URL+"/search/movie?api_key="+process.env.TMDB_API_KEY+"&query="+searchQuery);
        let json = await response.json();
        return json.results.slice(0,5);
    } catch (err) {
        console.log(err);
    }
}

export async function getMovieGenre(genreID: string) {
    try {
        let response = await fetch(process.env.TMDB_API_BASE_URL+"/genre/movie/list?api_key="+process.env.TMDB_API_KEY);
        let json = await response.json();
        let genre = '';
        json.genres.forEach((item: genre) => {
            if(item.id == genreID){
                genre = item.name;
            }
        });
        return genre;
    } catch (err) {
        console.log(err);
    }
}


export async function searchTVShow(searchQuery: string) {
    try {
        let response = await fetch(process.env.TMDB_API_BASE_URL+"/search/tv?api_key="+process.env.TMDB_API_KEY+"&query="+searchQuery);
        let json = await response.json();
        return json.results.slice(0,5);;
    } catch (err) {
        console.log(err);
    }
}

export async function getTVShowGenre(genreID: string) {
    try {
        let response = await fetch(process.env.TMDB_API_BASE_URL+"/genre/tv/list?api_key="+process.env.TMDB_API_KEY);
        let json = await response.json();
        let genre = '';
        json.genres.forEach((item: genre) => {
            if(item.id == genreID){
                genre = item.name;
            }
        });
        return genre;
    } catch (err) {
        console.log(err);
    }
}
