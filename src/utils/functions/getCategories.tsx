import axios from "axios";
export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:4000/category");
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFoods = async () => {
  try {
    const response = await axios.get("http://localhost:4000/foods");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
