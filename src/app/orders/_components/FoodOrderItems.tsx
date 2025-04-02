import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

export const FoodOrderItems = (props: {
  items: {
    foodName: string;
    image: string;
    quantity: number;
  }[];
}) => {
  const { items } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer flex gap-5">
          <p>{items.length} Foods</p>
          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="flex flex-col gap-5">
          {items.map((item) => {
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
                    <img src={item.image} className="w-full h-full" alt="" />
                  </div>
                  <p>{item.foodName}</p>
                </div>
                <p>x{item.quantity}</p>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
