export type Category = { categoryName: string };
export type Food = {
  foodName: string;
  category: Category;
  ingredients: string;
  image: string;
  price: number;
  _id: string;
};
