import axios from "axios";


export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tinutinu"); // Required for unsigned uploads

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dvaqcms9l/image/upload`,
      formData
    );
    return response.data.secure_url; // Return uploaded image URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export const uploadVidToCloudinary = async (file) => {
    if (!file) return null;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tinutinu"); // Required for unsigned uploads
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvaqcms9l/video/upload`,
        formData
      );
      return response.data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };
  