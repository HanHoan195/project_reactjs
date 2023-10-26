import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../layout/Spinner"
import MovieService from "../service/movieService"
import ReactPlayer from "react-player"

const WatchMovie = () => {
    const [movieDetail, setMovieDetail] = useState({})
    const { movieId } = useParams()
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [randomId, setRandomId] = useState('');

    const generateRandomId = () => {
        const id = Math.random().toString(36).substring(2, 9); // Tạo ID từ chuỗi ngẫu nhiên
        setRandomId(id);
    };

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

    const addComment = () => {
        setComments([...comments, newComment]);
        setNewComment("");
    }

    const { avatar, nameMovie, trailer_url, desscription } = movieDetail
    return (
        <div className="container mt-5">
            {loading ? (
                <Spinner />
            ) : (
                <div className="row">
                    <div className="col-md-2" style={{ marginLeft: "120px" }}>
                        <img src={avatar} alt={nameMovie} style={{ width: "200px", height: "250px" }} />
                    </div>

                    <div className="col-md-7 mt-3">
                        <h2>{nameMovie}</h2>
                        <hr />
                        <p>{desscription}</p>
                    </div>

                    <div className="mt-4">
                        <div className="embed-responsive embed-responsive-16by9 mb-5"
                            style={{ width: "100%", height: "700px" }} >
                            <ReactPlayer
                                url={trailer_url}
                                width="100%"
                                height="700px"
                                playing={true}
                                controls={false}
                            />
                        </div>
                    </div>
                    <div className="comments" style={{ backgroundColor: "aliceblue", color: "black" }}>
                        <div className="row mb-5">
                            <h2>Bình luận</h2>
                            <form className="d-flex">
                                <input className="form-control me-2" type="text"
                                    placeholder="Viết bình luận..." aria-label="Search"
                                    value={newComment} onChange={e => setNewComment(e.target.value)}
                                />
                                <button className="btn btn-primary" type="button" onClick={() => { addComment(); generateRandomId(); }}>
                                    Đăng
                                </button>
                            </form>
                        </div>
                        <div className="mb-5">
                            {
                                comments && comments.map((comment) => (
                                    <div key={comment}>
                                        <p><strong>{randomId}: </strong>{comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}
export default WatchMovie;