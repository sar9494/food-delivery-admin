export type Category = { categoryName: string; _id: string };
export type Food = {
  foodName: string;
  category: string;
  ingredients: string;
  image: string;
  price: number;
  _id: string | null;
};
