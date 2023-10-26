import axios from "axios";

const DOMAIN_API = `https://json-server-xir9.onrender.com`
// const DOMAIN_API = `http://localhost:3300`
class MovieService {

    static getAll() {
        return axios.get(DOMAIN_API + `/movie`)
    }

    static getById(id) {
        return axios.get(DOMAIN_API + `/movie/${id}`)
    }

    static addMovie(data) {
        return axios.post(DOMAIN_API + `/movie`, data)
    }

    static delete(id) {
        return axios.delete(DOMAIN_API + `/movie/${id}`)
    }

    static editMovie(id, data) {
        return axios.patch(DOMAIN_API + `/movie/${id}`, data)
    }
}
export default MovieService;