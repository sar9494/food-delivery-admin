import axios from "axios";
export const getData = async () => {
  try {
    const response = await axios.get(
      "https://food-delivery-service-bx3v.onrender.com/foodOrders"
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
