import { useEffect, useState } from "react";
import { DishButton } from "../_components/DishButton";
import { getCategories, getFoods } from "@/utils/functions/getCategories";
import { Category, Food } from "@/utils/types/types";
import { AddDishButton } from "@/app/(food-menu)/_components/AddDishButton";
import { AddCategoryButton } from "../_components/AddCategoryButton";
export const Categories = (props: {
  foods: Array<Food>;
  categories: Array<Category>;
}) => {
  const { foods, categories } = props;
  return (
    <div className="bg-white rounded-md p-5">
      <p className="text-xl font-bold pb-5 ">Dishes category</p>
      <div className="flex gap-3">
        <DishButton name="All dishes" size={foods?.length} />
        {categories?.map((el, index) => {
          return <DishButton key={index} name={el.categoryName} size={3} />;
        })}
        <AddCategoryButton />
      </div>
    </div>
  );
};
