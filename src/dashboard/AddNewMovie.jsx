import { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../layout/Spinner";
import Cloudinary from "../cloudinary/Cloudinary";

const movieSchema = yup.object({
    nameMovie: yup
        .string()
        .required('Tên không được để trống'),
    duration: yup
        .string()
        .required('Thời lượng không được để trống'),
    director: yup
        .string()
        .required('Đạo diễn không được để trống'),
    country: yup
        .string()
        .required('Quốc gia không được để trống'),
    desscription: yup
        .string()
        .required('Mô tả không được để trống'),
    trailer_url: yup
        .string()
        .required('Chưa có trailer  '),
});

const category = ["Hành động", "Viễn tưởng", "Phiêu lưu", "Kinh dị", "Truyền hình", "Tâm lý", 'Hình sự', "Võ thuật"]

const AddNewMovie = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [setChangedAvatar] = useState(false);
    let { handleUpload, imageUrl } = Cloudinary();
    const [selectedCategory, setSelectedCategory] = useState(new Array(category.length).fill(false));
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(movieSchema) })

    const handleAddMovie = async (data) => {
        setLoading(true);

        if (imageUrl) {
            data.avatar = imageUrl;
        }
        try {
            await axios.post("https://json-server-xir9.onrender.com/movie", data, {
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
    }

    const handleUploadPoster = async (e) => {
        setChangedAvatar(false);
        await handleUpload(e.target.files[0])
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
    }

    return (
        <div className="container mt-2">
            <div className="d-flex my-2">
                <h3 className="me-3">Add New Movie</h3>
                <NavLink className="btn btn-outline-primary" to={"/dashboard"}>
                    <i className="fa fa-arrow-left me-2" />
                    Back To Dashboard
                </NavLink>
            </div>
            {
                loading ? <Spinner /> : (
                    <form onSubmit={handleSubmit(handleAddMovie)}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label for="avatar" className="form-label">Poster</label>
                                    <input type="file" name="avatar" id="avatar" className="form-control"
                                        {...register("imageUrl")}
                                        onChange={(event) => handleUploadPoster(event)}
                                    />
                                    <img src={imageUrl} alt="" style={{ width: 410, height: 500 }}
                                        className="mt-3"
                                    />
                                    <span className="text-danger">{errors?.avatar?.message}</span>
                                </div>
                            </div>
                            <div className="col-md-8" style={{ marginBottom: "50px" }}>
                                <div className="mb-3">
                                    <label for="name_movie" className="form-label">Tên phim</label>
                                    <input type="text" name="name_movie" id="name_movie" className="form-control"
                                        {...register("nameMovie")} />
                                    <span className="text-danger">{errors?.nameMovie?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="duration" className="form-label">Thời lượng</label>
                                    <input type="text" name="duration" id="duration" className="form-control"
                                        {...register("duration")} />
                                    <span className="text-danger">{errors?.duration?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="country" className="form-label">Quốc gia</label>
                                    <input type="text" name="country" id="country" className="form-control"
                                        {...register("country")} />
                                    <span className="text-danger">{errors?.actor?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="actor" className="form-label">Đạo diễn</label>
                                    <input type="text" name="director" id="director" className="form-control"
                                        {...register("director")} />
                                    <span className="text-danger">{errors?.director?.message}</span>
                                </div>
                                <div className="mb-3 row">
                                    <label for="category" className="form-label">Thể loại</label>
                                    {category.map(category => {
                                        return (
                                            <div key={category} className='col-lg-4'>
                                                <input type="checkbox" id={category} name={category} value={category}
                                                    onChange={handleChangeCategory}
                                                    {...register("category")}
                                                ></input>
                                                <label htmlFor={category}>{category}</label>
                                            </div>
                                        )
                                    })}
                                    <span className="text-danger">{errors?.category?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Giới thiệu</label>
                                    <textarea name="description" id="description" className="form-control" rows="4"
                                        {...register("desscription")}></textarea>
                                    <span className="text-danger">{errors?.desscription?.message}</span>
                                </div>
                                <div className="mb-3">
                                    <label for="trailer_url" className="form-label">Trailer</label>
                                    <input type="text" name="trailer_url" id="trailer_url" className="form-control"
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
export { movieSchema, category }
export default AddNewMovie;