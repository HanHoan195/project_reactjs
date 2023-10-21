import { upload } from "@testing-library/user-event/dist/upload";
import axios from "axios";
import { useState } from "react";

const Cloudinary = () => {
    const cloudName = 'dqgavjgs1';
    const unsignedUploadPrefix = 'zynqapjr';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const [imageUrl, setImageUrl] = useState([]);

    const handleUpload = async (file) => {
        if (!file || file.lenght === 0) {
            return;
        }

        let newImageUrl = '';
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", unsignedUploadPrefix);

        try {
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            newImageUrl = res.data.url;
            console.log('Upload success', res.data.url);

        } catch (error) {
            console.log('upload fail', error);
        }
        setImageUrl(newImageUrl);
    }
    return { handleUpload, imageUrl, setImageUrl };
}
export default Cloudinary;