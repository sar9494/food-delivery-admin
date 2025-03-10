import axios from "axios";
export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/foodOrders");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
