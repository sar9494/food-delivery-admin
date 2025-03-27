import { DishButton } from "../_components/DishButton";
import { Category, Food } from "@/utils/types/types";
import { AddCategoryModal } from "../_components/AddCategoryButton";
import { useCategory } from "@/provider/CategoryProvider";
export const Categories = (props: { foods: Array<Food> }) => {
  const { foods } = props;
  const { categories, refetch, isLoading } = useCategory();

  return (
    <div className="bg-white rounded-md p-5">
      <p className="text-xl font-bold pb-5 ">Dishes category</p>
      <div className="flex gap-3 flex-wrap w-full">
        <DishButton name="All dishes" size={foods?.length} />
        {isLoading ? (
          <div>Loading categories ...</div>
        ) : (
          categories?.map((el: Category, index: number) => {
            return (
              <DishButton
                key={index}
                name={el.categoryName}
                size={el.foodCount}
              />
            );
          })
        )}
        <AddCategoryModal refetch={refetch} />
      </div>
    </div>
  );
};
