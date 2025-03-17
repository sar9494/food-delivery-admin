import axios from "axios";
import { Food } from "../types/types";
export const getAllFood = () => {};
export const updateFoodInfo = async (newInfo: Food) => {
  console.log(newInfo);
  const response = await axios.put("http://localhost:4000/foods", newInfo);
  return response.data;
};
