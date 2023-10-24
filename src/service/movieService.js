import axios from "axios";
import { date } from "yup";

class MovieService {
    static getAll() {
        return axios.get(`https://json-server-xir9.onrender.com/movie`)
    }
    static addMovie(data) {
        return axios.post(`https://json-server-xir9.onrender.com/movie`, data)
    }
    static getById(id) {
        return axios.get(`https://json-server-xir9.onrender.com/movie/${id}`)
    }
    static delete(id) {
        return axios.delete(`https://json-server-xir9.onrender.com/movie/${id}`)
    }
    static editMovie(id, data) {
        return axios.patch(`https://json-server-xir9.onrender.com/movie/${id}`, data)
    }
}
export default MovieService;