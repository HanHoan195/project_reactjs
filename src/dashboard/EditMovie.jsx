import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { category, movieSchema } from "./AddNewMovie";
import Cloudinary from "../cloudinary/Cloudinary";
import MovieService from "../service/movieService";
import Swal from "sweetalert2";

const EditMovie = () => {
    let { handleUpload, imageUrl } = Cloudinary();
    const [loading, setLoading] = useState(false)
    const [movieEdit, setMovieEdit] = useState({});
    const [changedAvatar, setChangedAvatar] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(new Array(category.length).fill(false));
    const { movieId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(movieSchema),
        values: movieEdit
    })
    useEffect(() => {
        try {
            setLoading(true)
            async function getMovieById() {
                let res = await MovieService.getById(movieId)
                setMovieEdit(res.data)
                setSelectedCategory(res.data.category)
                console.log(res.data.category);
                setLoading(false)
            }

            getMovieById();


        } catch (error) {
            console.log(error);
        }
    }, [movieId])

    const handleUploadPoster = async (e) => {
        setChangedAvatar(false);
        await handleUpload(e.target.files[0]);
    }

    const handleEditMovie = async (movieEdit) => {
        try {
            setLoading(true)

            await MovieService.editMovie(movieId, movieEdit)
            setMovieEdit(movieEdit)
            setLoading(false)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cập nhật thành công',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeCategory = (e) => {
        const currentCategory = e.target.value;
        let updateCategory = [];
        if (!selectedCategory) {
            updateCategory.push(currentCategory)
        } else {
            if (selectedCategory.includes(currentCategory)) {
                updateCategory = selectedCategory.filter(c => c !== currentCategory);
            } else {
                updateCategory = [...selectedCategory, currentCategory]
            }
        }
        setSelectedCategory(updateCategory);

        setMovieEdit(prev => ({
            ...prev,
            category: updateCategory
        }))
    }


    return (
        <div className="container mt-2">
            <div className="d-flex my-2">
                <h3 className="me-3">Edit Movie</h3>
                <NavLink className="btn btn-outline-primary" to={"/dashboard"}>
                    <i className="fa fa-arrow-left me-2" />
                    Back To Dashboard
                </NavLink>
            </div>
            {
                loading ? <Spinner /> : (
                    <form onSubmit={handleSubmit(handleEditMovie)}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label for="avatar" className="form-label">Poster</label>
                                    <input type="file" name="avatar" id="avatar" className="form-control"
                                        {...register("imageUrl")}
                                        onChange={(event) => handleUploadPoster(event)}
                                    />
                                    {movieEdit.avatar && (
                                        <img src={changedAvatar ? movieEdit.avatar : imageUrl} alt="" style={{ width: 410, height: 500 }} className="mt-3" />
                                    )}

                                    <span className="text-danger">{errors?.avatar?.message}</span>
                                </div>
                            </div>
                            <div className="col-md-8" style={{ marginBottom: "50px" }}>
                                <div className="mb-3">
                                    <label for="name_movie" className="form-label">Tên phim</label>
                                    <input type="text" name="name_movie" id="name_movie" className="form-control"
                                        {...register("nameMovie")}
                                        defaultValue={movieEdit.nameMovie}
                                    />
                                    <span className="text-danger">{errors?.nameMovie?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="duration" className="form-label">Thời lượng</label>
                                    <input type="text" name="duration" id="duration" className="form-control"
                                        {...register("duration")}
                                        defaultValue={movieEdit.duration} />
                                    <span className="text-danger">{errors?.duration?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="country" className="form-label">Quốc gia</label>
                                    <input type="text" name="country" id="country" className="form-control"
                                        {...register("country")}
                                        defaultValue={movieEdit.country} />
                                    <span className="text-danger">{errors?.country?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="actor" className="form-label">Đạo diễn</label>
                                    <input type="text" name="director" id="director" className="form-control"
                                        {...register("director")}
                                        defaultValue={movieEdit.director}
                                    />
                                    <span className="text-danger">{errors?.director?.message}</span>
                                </div>
                                <div className="mb-3 row">
                                    <label for="category" className="form-label">Thể loại</label>
                                    {category.map(cat => {
                                        return (
                                            <div key={cat} className='col-lg-4'>
                                                <input type="checkbox"
                                                    id={cat} name={cat}
                                                    value={cat}
                                                    onChange={handleChangeCategory}
                                                    {...register("category")}
                                                ></input>
                                                <label htmlFor={cat}>{cat}</label>
                                            </div>
                                        )
                                    })}
                                    <span className="text-danger">{errors?.category?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="desscription" className="form-label">Giới thiệu</label>
                                    <textarea name="desscription" id="desscription" className="form-control" rows="4"
                                        {...register("desscription")} defaultValue={movieEdit.desscription}></textarea>
                                    <span className="text-danger">{errors?.desscription?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="trailer_url" className="form-label">Trailer</label>
                                    <input type="text" name="trailer_url" id="trailer_url" className="form-control"
                                        defaultValue={movieEdit.trailer_url}
                                        {...register("trailer_url")} />
                                    <span className="text-danger">{errors?.trailer_url?.message}</span>
                                </div>
                                <button type="submit" className="btn btn-primary me-3">Submit</button>
                                <button type="button" className="btn btn-danger" onClick={() => reset()}>Cancel</button>
                            </div>
                        </div>
                    </form>
                )
            }
        </div>
    )
}
export default EditMovie;