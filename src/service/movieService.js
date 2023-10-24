import axios from "axios";
import { date } from "yup";

class MovieService {
    static getAll() {
        return axios.get(`http://localhost:3300/movie`)
    }
    static addMovie(data) {
        return axios.post(`http://localhost:3300/movie`, data)
    }
    static getById(id) {
        return axios.get(`http://localhost:3300/movie/${id}`)
    }
    static delete(id) {
        return axios.delete(`http://localhost:3300/movie/${id}`)
    }
    static editMovie(id, data) {
        return axios.patch(`http://localhost:3300/movie/${id}`, data)
    }
}
export default MovieService;