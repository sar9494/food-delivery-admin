import { Category, Food } from "@/utils/types/types";
import { FoodCategory } from "../_components/FoodCategory";
export const Dishes = (props: {
  foods: Array<Food>;
  categories: Array<Category>;
}) => {
  const { foods, categories } = props;
  return (
    <div className="flex flex-col gap-5">
      {categories?.map((e, index) => {
        return (
          <FoodCategory
            categories={categories}
            key={index}
            name={e.categoryName}
            id={e._id}
            foods={foods}
          />
        );
      })}
    </div>
  );
};
