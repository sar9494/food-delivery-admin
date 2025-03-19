import axios from "axios";
import { Food } from "../types/types";
export const getAllFood = () => {};
export const updateFoodInfo = async (newInfo: {
  foodName: string;
  category: string;
  ingredients: string;
  image: string;
  price: number;
  id: string;
}) => {
  console.log(newInfo);
  const response = await axios.put("http://localhost:4000/foods", newInfo);
  console.log(response.data);

  return response.data;
};
export const deleteFood = async (param: { id: string }) => {
  const response = await axios.delete("http://localhost:4000/foods", {
    data: param,
  });
  return response.data;
};
