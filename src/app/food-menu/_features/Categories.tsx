import { CategoryBox } from "../_components/CategoryBox";
import { Category } from "@/provider/CategoryProvider";
import { AddCategoryModal } from "../_components/AddCategoryModal";
import { useCategory } from "@/provider/CategoryProvider";
import { useFood } from "@/provider/FoodProvider";
export const Categories = () => {
  const { categories, isLoading } = useCategory();
  const { foods } = useFood();
  return (
    <div className="bg-white rounded-md p-5">
      <p className="text-xl font-bold pb-5 ">Dishes category</p>
      <div className="flex gap-3 flex-wrap w-full">
        <CategoryBox name="All dishes" size={foods?.length} />
        {isLoading ? (
          <div>Loading categories ...</div>
        ) : (
          categories?.map((el: Category, index: number) => {
            return (
              <CategoryBox
                key={index}
                name={el.categoryName}
                size={el.foodCount}
              />
            );
          })
        )}
        <AddCategoryModal />
      </div>
    </div>
  );
};
