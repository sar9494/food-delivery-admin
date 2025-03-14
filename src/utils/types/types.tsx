export type Category = { categoryName: string; _id: string; foodCount: number };
export type Food = {
  foodName: string;
  category: string;
  ingredients: string;
  image: string | File;
  price: number;
  _id: string | null;
};
