import axios from "axios";
export const uploadImageToCloudinary = async (file: File) => {
  if (!file) return null;

  try {
    const userName = "dszot6j60";
    const upload_preset = "saruul9484";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${userName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};
