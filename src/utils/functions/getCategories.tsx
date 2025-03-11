import axios from "axios";
export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:5000/category");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFoods = async () => {
  try {
    const response = await axios.get("http://localhost:5000/foods");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
