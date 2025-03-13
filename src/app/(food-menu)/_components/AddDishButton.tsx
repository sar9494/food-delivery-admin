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
    const { foodName, price } = values;
    try {
      const response = await axios.post("http://localhost:5000/foods", {
        foodName: foodName,
        price: price,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
      if (response.data.success === false) {
        console.log(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function setFieldValue(arg0: string, file: File) {
    throw new Error("Function not implemented.");
  }

  return (
    <Formik
      validationSchema={foodRejex}
      onSubmit={addFoodButton}
      initialValues={{ foodName: "", price: 0, ingredients: "", image: "" }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
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
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-5">
                  <div className="w-1/2">
                    <Label htmlFor="foodName">Dish name</Label>
                    <Input
                      id="foodName"
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
                    name="ingredients"
                    onChange={handleChange}
                    value={values.ingredients}
                  />
                  <p className="text-red-500">{errors.ingredients}</p>
                </div>
                <div>
                  {values.image.length !== 0 && (
                    <div
                      // name="image"
                      className="cursor-pointer w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative"
                    >
                      hdf{values.image.length}
                      <img
                        src={values.image}
                        className="w-full h-full rounded-md object-cover"
                      ></img>
                    </div>
                  )}
                  {values.image.length === 0 && (
                    <>
                      <label
                        htmlFor="image"
                        className="cursor-pointer w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative"
                      >
                        <Image />
                        <h3>Browse or Drop Image {values.image.length}</h3>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFieldValue("image", file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-red-600">{errors?.image}</p>
                    </>
                  )}
                  {/* <Label htmlFor="image">Food image</Label>
                  <div>
                    <Image />
                    <h3>Browse or Drop Image</h3>
                    <Input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleChange}
                    />
                  </div> */}

                  {}
                  {/* <p className="text-red-500">{errors.image}</p> */}
                </div>
              </div>
            </form>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white">
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Formik>
  );
}
