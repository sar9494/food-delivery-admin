import { Category, Food } from "@/utils/types/types";
import { AddDishButton } from "./AddDishButton";

export const FoodCategory = (props: {
  foods: Array<Food>;
  name: string;
  id: string;
}) => {
  const { name, foods, id } = props;
  console.log(foods);

  return (
    <div className="bg-white rounded-md p-5">
      <p>{name}</p>
      <div className="flex gap-5">
        <AddDishButton id={id} />
        {foods
          .filter((el) => el.category === id)
          .map((el, index) => {
            return <div key={index}>{el.foodName}</div>;
          })}
      </div>
    </div>
  );
};
