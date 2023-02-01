
const api_key = "7875d40e76ab9dbbc34cfaab8e292963";
const tmdb_api_v3_url = "https://api.themoviedb.org/3/";

const getTMDBUrl = async (type) => {
    const data = await fetch(`${tmdb_api_v3_url}${type}?api_key=${api_key}`);
    return data.json();
}

const getConfiguration = async () => {
    return getTMDBUrl("configuration");
}

const getImageUrl = (base_url, size, file_path) => {
    return base_url + size + file_path;
}

const getUpcomingMovies = async () => {
    return getTMDBUrl("movie/upcoming");
}

const getSimilarMovies = async (id) => {
    return getTMDBUrl(`movie/${id}/similar`);
}

const getMovie = async (id) => {
    return getTMDBUrl(`movie/${id}`);
}


export { getConfiguration, getImageUrl, getUpcomingMovies, getMovie, getSimilarMovies };