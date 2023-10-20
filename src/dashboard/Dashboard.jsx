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
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Actor</th>
                            <th scope="col">Director</th>
                            <th scope="col">Categorry</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                            <th scope="col">
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
                                        <td>{item.actor}</td>
                                        <td>{item.director}</td>
                                        <td>{item.category}</td>
                                        <td>{item.desscription}</td>
                                        <td>
                                            <button className="btn btn-outline-primary">Edit</button>
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