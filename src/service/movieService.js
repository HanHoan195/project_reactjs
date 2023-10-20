import axios from "axios";

class MovieService {
    static getAll() {
        return axios.get(`https://653224e74d4c2e3f333dab74.mockapi.io/api/movies/movie`)
    }
    static addMovie(data) {
        return axios.get(`https://653224e74d4c2e3f333dab74.mockapi.io/api/movies/movie`, data)
    }
}
export default MovieService;