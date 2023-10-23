import { useEffect, useState } from "react"
import MovieService from "../service/movieService"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"

const Dashboard = () => {
    const [listMovies, setListMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            setLoading(true)

            async function getMovies() {
                let movieRes = await MovieService.getAll();
                const sortedMovies = movieRes.data.sort((a, b) => b.id - a.id);
                setListMovies(sortedMovies)
                setLoading(false)
            }

            getMovies();

        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="container-fluid">
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên phim</th>
                            <th scope="col">Thời lượng</th>
                            <th scope="col">Quốc gia</th>
                            <th scope="col">Đạo diễn</th>
                            <th scope="col">Thể loại</th>
                            <th scope="col">Giới thiệu</th>
                            <th scope="col" colSpan={2}>
                                <Link to={"/dashboard/add"}>
                                    <button className="btn btn-outline-success">
                                        Add new movie
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <Spinner /> : (
                                listMovies && listMovies.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.nameMovie}</td>
                                        <td>{item.duration}</td>
                                        <td>{item.country}</td>
                                        <td>{item.director}</td>
                                        <td>{item.category.join(',')}</td>
                                        <td>{item.desscription}</td>
                                        <td>
                                            <Link to={`/dashboard/edit/${item.id}`}>
                                                <button className="btn btn-outline-primary">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Dashboard;