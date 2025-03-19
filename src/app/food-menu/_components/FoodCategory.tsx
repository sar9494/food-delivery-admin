import { Category, Food } from "@/utils/types/types";
import { AddDishButton } from "./AddDishButton";
import { Pen } from "lucide-react";
import { updateFoodInfo } from "@/utils/functions/getFoogInfo";
import { UpdateFoodPage } from "@/app/food-menu/_components/UpdateFoodPage";

export const FoodCategory = (props: {
  foods: Array<Food>;
  name: string;
  id: string;
  categories: Array<Category>;
}) => {
  const { name, foods, id, categories } = props;

  return (
    <div className="bg-white rounded-md p-5">
      <p className="">{name}</p>
      <div className="flex gap-5">
        <AddDishButton id={id} name={name} />
        {foods
          .filter((el) => el.category.id === id)
          .map((el, index) => {
            return (
              <div
                key={index}
                className="p-4 w-[270px] h-[240px] rounded-lg  border border-gray-200 flex flex-col gap-3"
              >
                <div className="w-full h-3/5 rounded-lg flex  gap-5 relative">
                  <img
                    src={el.image}
                    alt=""
                    className="rounded-lg w-full object-cover"
                  />
                  <UpdateFoodPage food={el} categories={categories} />
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="text-red-500">{el.foodName}</p>
                    <p>${el.price}</p>
                  </div>
                  <p className="text-sm">{el.ingredients}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
