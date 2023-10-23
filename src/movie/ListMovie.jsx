import { useEffect } from "react";
import { useState } from "react";
import MovieService from "../service/movieService";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const ListMovie = () => {
    const [listMovies, setListMovies] = useState([])
    const [loading, setLoading] = useState(false)

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
    }, [])

    return (
        <div className="container home">
            <div className="d-flex">
                <div className="row">
                    {
                        loading ? <Spinner /> : (
                            listMovies && listMovies.map((item, index) =>
                                <div key={index} className="row col-md-3 mt-2 me-1">
                                    <div className="card" style={{ width: 300, border: "none" }}>
                                        <Link to={`/home/detai/${item.id}`}>
                                            <img className="card-img-top" src={item.avatar} alt="Card image" />
                                        </Link>
                                        <div className="card-body">
                                            <h4 className="card-title">{item.nameMovie}</h4>
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