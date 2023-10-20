import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const movieSchema = yup.object({
    nameMovie: yup
        .string()
        .required('Tên không được để trống'),
    duration: yup
        .string()
        .required('Thời lượng không được để trống'),
    director: yup
        .string()
        .required('Không được để trống'),
    actor: yup
        .string()
        .required('Không được để trống'),
    description: yup
        .string()
        .required('Không được để trống'),
});


const AddNewMovie = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(movieSchema) })

    const handleAddMovie = async (data) => {
        setLoading(true);
        try {
            await axios.post("https://653224e74d4c2e3f333dab74.mockapi.io/api/movies/movie", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setLoading(false);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thêm thành công',
                showConfirmButton: false,
                timer: 1500
            });

            reset();
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
        console.log(data);
    }

    return (
        <div class="container mt-2">
            <div className="d-flex my-2">
                <h3 className="me-3">Add New Movie</h3>
                <NavLink className="btn btn-outline-primary" to={"/home"}>
                    <i className="fa fa-arrow-left me-2" />
                    Back To Home
                </NavLink>
            </div>
            <form onSubmit={handleSubmit(handleAddMovie)}>
                <div class="row">
                    <div class="col-md-4">
                        <div id="image-preview">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label for="name_movie" class="form-label">Name Movie</label>
                            <input type="text" name="name_movie" id="name_movie" class="form-control"
                                placeholder="Enter Name Movie..." {...register("nameMovie")} />
                            <span className="text-danger">{errors?.nameMovie?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="poster" class="form-label">Poster</label>
                            <input type="file" name="poster" id="poster" class="form-control" {...register("avatar")} />
                            <span className="text-danger">{errors?.avatar?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration</label>
                            <input type="text" name="duration" id="duration" class="form-control"
                                placeholder="Duration..." {...register("duration")} />
                            <span className="text-danger">{errors?.duration?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="actor" class="form-label">Actor</label>
                            <input type="text" name="actor" id="actor" class="form-control"
                                placeholder="Actor..." {...register("actor")} />
                            <span className="text-danger">{errors?.actor?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="actor" class="form-label">Director</label>
                            <input type="text" name="director" id="director" class="form-control"
                                placeholder="Director..." {...register("director")} />
                            <span className="text-danger">{errors?.director?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <select name="category" id="category" class="form-select" {...register("category")}>
                                <option value="action">Action</option>
                                <option value="comedy">Comedy</option>
                                <option value="horror">Horror</option>
                                <option value="thriller">Thriller</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="adventure">Adventure</option>
                                <option value="romance">Romance</option>
                            </select>
                            <span className="text-danger">{errors?.category?.message}</span>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea name="description" id="description" class="form-control" rows="4"
                                placeholder="Description..." {...register("desscription")}></textarea>
                            <span className="text-danger">{errors?.description?.message}</span>
                        </div>
                        <button type="submit" class="btn btn-primary me-3">Submit</button>
                        <button type="button" class="btn btn-danger" onClick={() => reset()}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default AddNewMovie;