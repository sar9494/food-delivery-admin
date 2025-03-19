import { DishButton } from "../_components/DishButton";
import { Category, Food } from "@/utils/types/types";
import { AddCategoryButton } from "../_components/AddCategoryButton";
export const Categories = (props: {
  foods: Array<Food>;
  categories: Array<Category>;
}) => {
  const { foods, categories } = props;
  return (
    <div className="bg-white rounded-md p-5">
      <p className="text-xl font-bold pb-5 ">Dishes category</p>
      <div className="flex gap-3 flex-wrap w-full">
        <DishButton name="All dishes" size={foods?.length} />
        {categories?.map((el, index) => {
          return (
            <DishButton
              key={index}
              name={el.categoryName}
              size={el.foodCount}
            />
          );
        })}
        <AddCategoryButton />
      </div>
    </div>
  );
};
