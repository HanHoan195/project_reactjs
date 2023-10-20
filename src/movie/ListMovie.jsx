import { useEffect } from "react";
import { useState } from "react";
import MovieService from "../service/movieService";
import Spinner from "../layout/Spinner";

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
        <div className="container">
            <div className="d-flex">
                <div className="row">
                    {
                        loading ? <Spinner /> : (
                            listMovies && listMovies.map((item, index) =>
                                <div key={index} className="row col-md-3 mt-2 me-1">
                                    <div className="card" style={{ width: 300, border: "none" }}>
                                        <img className="card-img-top" src="https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-nen-nguoi-nhen-chibi-cute-cho-dien-thoai.jpg" alt="Card image" />
                                        <div className="card-body">
                                            <h4 className="card-title">{item.nameMovie}</h4>
                                            <p className="card-text">Some example text.</p>
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