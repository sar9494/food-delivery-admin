import { useEffect, useState } from "react";
import { Category, Food } from "@/utils/types/types";
import { getCategories, getFoods } from "@/utils/functions/getCategories";
import { Categories } from "./Categories";
import { Dishes } from "./Dishes";
export const MainPage = () => {
  const [categories, setCategories] = useState(Array<Category>);
  const [foods, setFoods] = useState(Array<Food>);
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategories(categories);
      const foods = await getFoods();
      setFoods(foods);
      console.log(categories, foods);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <Categories foods={foods} categories={categories} />
      <Dishes foods={foods} categories={categories} />
    </div>
  );
};
