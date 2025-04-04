import { Food } from "@/provider/FoodProvider";
import { AddDishButton } from "../_components/AddDishModal";
import { UpdateFoodPage } from "../_components/UpdateFoodModal";
import { useCategory } from "@/provider/CategoryProvider";
import { useFood } from "@/provider/FoodProvider";
export const Dishes = () => {
  const { categories } = useCategory();
  const { foods, isLoading } = useFood();

  return (
    <div className="flex flex-col gap-5">
      {categories?.map((e, index) => {
        return (
          <div className="bg-white rounded-md p-5" key={index}>
            <p className="">{e.categoryName}</p>
            <div className="flex gap-5  flex-wrap">
              <AddDishButton id={e._id} name={e.categoryName} />
              {isLoading ? (
                <div>...Loading</div>
              ) : (
                foods
                  ?.filter((el: Food) => el.category.id === e._id)
                  .map((el: Food, index: number) => {
                    return (
                      <div
                        key={index}
                        className="p-4 w-[270px] h-[240px] rounded-lg  border border-gray-200 flex flex-col gap-3"
                      >
                        <div className="w-full h-3/5 rounded-lg flex  gap-5 relative">
                          <img
                            src={el.image}
                            alt="food image"
                            className="rounded-lg w-full object-cover"
                          />
                          <UpdateFoodPage food={el} />
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
                  })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
