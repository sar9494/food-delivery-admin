import axios from "axios";
export const getAllFood = () => {};
export const updateFoodInfo = async (
  newInfo: {
    foodName: string;
    category: string;
    ingredients: string;
    image: string;
    price: number;
    id: string;
  },
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log(newInfo);
  try {
    setIsUploading(true);
    const response = await axios.put("http://localhost:4000/foods", newInfo);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error when updating food info", error);
  } finally {
    setIsUploading(false);
  }
};
export const deleteFood = async (param: { id: string }) => {
  const response = await axios.delete("http://localhost:4000/foods", {
    data: param,
  });
  return response.data;
};
