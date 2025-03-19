export type Category = { categoryName: string; _id: string; foodCount: number };
export type Food = {
  foodName: string;
  category: {
    id: string;
    name: string;
  };
  ingredients: string;
  image: string;
  price: number;
  _id: string;
};
