import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Food } from "@/utils/types/types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function AddDishButton(props: { id: string }) {
  const { id } = props;
  const [foodInfo, setFoodInfo] = useState<Food>({
    foodName: "",
    price: 0,
    ingredients: "",
    category: id,
    image: "",
    _id: null,
  });
  const infoChangesHandler = (e: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    if (e.target.name == "name") {
      setFoodInfo({ ...foodInfo, foodName: e.target.value });
    } else if (e.target.name == "price") {
      setFoodInfo({ ...foodInfo, price: parseInt(e.target.value) });
    } else if (e.target.name == "image") {
      setFoodInfo({ ...foodInfo, image: e.target.value });
    } else {
      setFoodInfo({ ...foodInfo, ingredients: e.target.value });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className=" bg-white rounded p-5">
        <DialogHeader>
          <DialogTitle>Add new Dish to</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-5">
              <div className="w-1/2">
                <Label htmlFor="name">Dish name</Label>
                <Input
                  id="name"
                  placeholder="Type food name"
                  className="rounded border-gray-300"
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="price">Dish name</Label>
                <Input
                  id="price"
                  placeholder="Enter price..."
                  className="rounded border-gray-300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea placeholder="List ingredients..." name="ingredients" />
            </div>
            <div>
              <Label htmlFor="image">Food image</Label>
              {}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" className="bg-black text-white">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
