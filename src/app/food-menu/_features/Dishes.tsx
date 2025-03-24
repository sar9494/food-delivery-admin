import { Category, Food } from "@/utils/types/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AddDishButton } from "../_components/AddDishButton";
import { UpdateFoodPage } from "../_components/UpdateFoodPage";
export const Dishes = (props: {
  foods: Array<Food>;
  categories: Array<Category>;
}) => {
  const { categories } = props;
  const {
    data: dishes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/foods");
      return response.data;
    },
  });
  return (
    <div className="flex flex-col gap-5">
      {categories?.map((e, index) => {
        return (
          <div className="bg-white rounded-md p-5" key={index}>
            <p className="">{e.categoryName}</p>
            <div className="flex gap-5  flex-wrap">
              <AddDishButton
                id={e._id}
                name={e.categoryName}
                refetch={refetch}
              />
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                dishes
                  .filter((el: Food) => el.category.id === e._id)
                  .map((el: Food, index: number) => {
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
                          <UpdateFoodPage
                            food={el}
                            categories={categories}
                            refetch={refetch}
                          />
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
