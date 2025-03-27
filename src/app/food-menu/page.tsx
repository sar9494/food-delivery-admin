"use client";
import { useEffect, useState } from "react";
import { Category, Food } from "@/utils/types/types";
import { getCategories, getFoods } from "@/utils/functions/getCategories";
import { Categories } from "./_features/Categories";
import { Dishes } from "./_features/Dishes";
import { CategoryProvider } from "@/provider/CategoryProvider";
export default function Home() {
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
    <CategoryProvider>
      <div className="flex flex-col gap-5 pt-5">
        <Categories foods={foods} />
        <Dishes foods={foods} categories={categories} />
      </div>
    </CategoryProvider>
  );
}
