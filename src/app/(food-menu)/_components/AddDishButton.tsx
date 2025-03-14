import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import { foodRejex } from "@/utils/rejexes/foodRejex";
import { Plus, Image } from "lucide-react";
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
import axios from "axios";
import { useRouter } from "next/navigation";

export function AddDishButton(props: { id: string; name: string }) {
  const router = useRouter();
  const { id, name } = props;
  const [foodInfo, setFoodInfo] = useState<Food>({
    foodName: "",
    price: 0,
    ingredients: "",
    category: id,
    image: "",
    _id: null,
  });
  const addFoodButton = async (values: {
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
  }) => {
    const { foodName, price, image, ingredients } = values;
    try {
      const response = await axios.post("http://localhost:4000/foods", {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: id,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Formik
      validationSchema={foodRejex}
      onSubmit={addFoodButton}
      initialValues={{
        foodName: "",
        price: 0,
        ingredients: "",
        image: "",
      }}
    >
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
        return (
          <form>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[270px] h-[240px] border-dashed border-2 border-red-500 flex flex-col gap-5"
                >
                  <div className="bg-red-500 p-4 rounded-full">
                    <Plus color="white" />
                  </div>
                  <p>Add new Dish to {name}</p>
                </Button>
              </DialogTrigger>
              <DialogContent className=" bg-white rounded p-5">
                <DialogHeader>
                  <DialogTitle>Add new Dish to {name}</DialogTitle>
                </DialogHeader>

                <div className="grid w-full items-center gap-4">
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <Label htmlFor="foodName">Dish name</Label>
                      <Input
                        id="foodName"
                        name="foodName"
                        placeholder="Type food name"
                        className="rounded border-gray-300"
                        onChange={handleChange}
                        value={values.foodName}
                      />
                      <p className="text-red-500">{errors.foodName}</p>
                    </div>
                    <div className="w-1/2">
                      <Label htmlFor="price">Dish price</Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="Enter price..."
                        className="rounded border-gray-300"
                        onChange={handleChange}
                        value={values.price}
                      />
                      <p className="text-red-500">{errors.price}</p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      placeholder="List ingredients..."
                      id="ingredients"
                      name="ingredients"
                      onChange={handleChange}
                      value={values.ingredients}
                    />
                    <p className="text-red-500">{errors.ingredients}</p>
                  </div>
                  <div>
                    <label htmlFor="image">
                      <Image />
                      <h3>Browse or Drop Image {values.image.length}</h3>
                    </label>
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue("image", URL.createObjectURL(file));
                        }
                      }}
                    />
                    {values.image.length !== 0 && (
                      <img src={values.image} alt="" />
                    )}

                    <p className="text-red-600">{errors?.image}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      return handleSubmit();
                    }}
                    type="submit"
                    className="bg-black text-white"
                  >
                    Add
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
//fi9MNili9yKhuZhnd8VhdEeQrMs API secret
//747162775331388   api key
//dszot6j60
