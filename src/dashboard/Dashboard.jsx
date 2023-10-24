import { useEffect, useState } from "react"
import MovieService from "../service/movieService"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

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

    // const handleDelete = async (movieRemove) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //           )
    //         }
    //       })
    //     let confirm = window.confirm("Xóa phim này?")
    //     if (!confirm) return;

    //     try {
    //         await MovieService.delete(movieRemove.id)

    //         setListMovies((prevListMovies) => prevListMovies.filter((item) => item !== movieRemove))
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'success',
    //             title: 'Xóa thành công',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })

    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    const handleDelete = async (movieRemove) => {
        try {
            const result = await Swal.fire({
                title: 'Xóa phim này?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa'
            });

            if (!result.isConfirmed) return;

            // User confirmed the deletion
            await MovieService.delete(movieRemove.id);
            setListMovies((prevListMovies) => prevListMovies.filter((item) => item.id !== movieRemove.id));

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
        }
    };



    function truncateDescription(desscription, maxLength) {
        if (desscription.length <= maxLength) {
            return desscription;
        } else {
            return desscription.slice(0, maxLength) + "...";
        }
    }
    return (
        <div className="container-fluid dashboard">
            <div>
                <h2 style={{ color: "black" }}>
                    List Movie
                </h2>
                <table className="table table-hover dashboard">
                    <thead>
                        <tr >
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
                                    <tr key={index} >
                                        <td style={{ color: "black" }}>{item.id}</td>
                                        <td style={{ color: "black" }}>{item.nameMovie}</td>
                                        <td style={{ color: "black" }}>{item.duration}</td>
                                        <td style={{ color: "black" }}>{item.country}</td>
                                        <td style={{ color: "black" }}>{item.director}</td>
                                        <td style={{ color: "black" }}>{item.category.join(',')}</td>
                                        <td style={{ color: "black" }}>
                                            {truncateDescription(item.desscription, 100)}
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/edit/${item.id}`}>
                                                <button className="btn btn-outline-primary">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-danger"
                                                onClick={() => handleDelete(item)}
                                            >Delete</button>
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