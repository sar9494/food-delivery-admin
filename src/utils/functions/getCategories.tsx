import axios from "axios";
export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://food-delivery-service-bx3v.onrender.com/category"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFoods = async () => {
  try {
    const response = await axios.get(
      "https://food-delivery-service-bx3v.onrender.com/foods"
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
