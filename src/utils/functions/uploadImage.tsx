import axios from "axios";
export const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);

  const imageUrl = await axios.post("");
};
