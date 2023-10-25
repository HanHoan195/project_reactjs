import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../layout/Spinner"
import MovieService from "../service/movieService"
import ReactPlayer from "react-player"

const MovieDetail = () => {
    const [movieDetail, setMovieDetail] = useState({})
    const { movieId } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            setLoading(true)

            async function getMovieDetail() {
                let res = await MovieService.getById(movieId)
                setMovieDetail(res.data)

                setLoading(false)
            }
            getMovieDetail();

        } catch (error) {
            console.log(error);
        }
    }, [movieId])

    const { avatar, nameMovie, country, director, duration, category, trailer_url, desscription } = movieDetail
    return (
        <div className="container mt-5">
            {loading ? (
                <Spinner />
            ) : (
                <div className="row">
                    <div className="col-md-3">
                        <img src={avatar} alt={nameMovie} style={{ width: "300px", height: "450px" }} />
                        <div className="mt-2" style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-primary me-3">Tải phim</button>
                            <button type="button" className="btn btn-danger">Xem phim</button>
                        </div>
                    </div>

                    <div className="col-md-9 mt-3">
                        <h2>{nameMovie}</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><strong>Quốc gia:</strong></td>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <td><strong>Đạo diễn:</strong></td>
                                    <td>{director}</td>
                                </tr>
                                <tr>
                                    <td><strong>Thời lượng:</strong></td>
                                    <td>{duration} phút</td>
                                </tr>
                                <tr>
                                    <td><strong>Thể loại:</strong></td>
                                    <td>{category ? category.join(", ") : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p><strong>Mô tả:</strong> {desscription}</p>

                    </div>

                    <div className="mt-4">
                        <h3>Trailer</h3>
                        <div className="embed-responsive embed-responsive-16by9 mb-5"
                            style={{ width: "100%", height: "500px" }} >
                            <ReactPlayer
                                url={trailer_url}
                                width="100%"
                                height="500px"
                                playing={true}
                                controls={false}
                            />
                        </div>
                    </div>

                </div>
            )
            }
        </div >
    )
}
export default MovieDetail;