import { useEffect } from "react";
import { useState } from "react";
import MovieService from "../service/movieService";
import Spinner from "../layout/Spinner";
import { Link, useSearchParams } from "react-router-dom";

const ListMovie = () => {
    const [listMovies, setListMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        try {
            setLoading(true)

            async function getMovies() {
                let movieRes = await MovieService.getAll();
                setListMovies(movieRes.data)
                setLoading(false)
            }

            getMovies();

        } catch (error) {
            console.log(error);
        }
    }, [searchParams])

    return (
        <div className="container home" >
            <div className="d-flex">
                <div className="row mb-5">
                    {
                        loading ? <Spinner /> : (
                            listMovies && (listMovies.filter(item => {
                                let filter = searchParams.get("filter");
                                if (!filter) return true;
                                let nameMovie = item.nameMovie.toLowerCase();
                                return nameMovie.includes(filter.toLowerCase())
                            }))
                                .map((item, index) =>
                                    <div key={index} className="row col-md-3 mt-2 me-1 ">
                                        <div className="card" style={{ width: 320, border: "none", backgroundColor: "rgb(2, 10, 32)" }}>
                                            <Link to={`/home/detai/${item.id}`}>
                                                <img className="card-img-top" src={item.avatar} alt="Card image" />
                                            </Link>
                                            <div className="card-body">
                                                <h4 className="card-title">{item.nameMovie}</h4>
                                                <button className="play-button">
                                                    <i className="fas fa-play"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default ListMovie;