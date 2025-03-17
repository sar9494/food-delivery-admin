import axios from "axios";
export const uploadImageToCloudinary = async (
  file: File,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!file) return null;

  setIsUploading(true);
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

    setIsUploading(false);
    return response.data.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    setIsUploading(false);
    return null;
  }
};
