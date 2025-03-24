import * as React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { Image, XCircle, Pen, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { foodRejex } from "@/utils/rejexes/foodRejex";
import { Category, Food } from "@/utils/types/types";
import { deleteFood } from "@/utils/functions/getFoogInfo";
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
export function UpdateFoodPage(props: {
  food: Food;
  categories: Array<Category>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) {
  const { categories, refetch } = props;
  const { foodName, price, ingredients, image, category, _id } = props.food;
  const [isPressed, setIsPressed] = useState(true);
  const queryClient = new QueryClient();
  const { mutate: updateDish, isPending } = useMutation({
    mutationFn: async ({
      foodName,
      price,
      image,
      ingredients,
      id,
      category,
    }: {
      foodName: string;
      price: number;
      ingredients: string;
      image: string;
      id: string;
      category: string;
    }) => {
      setIsPressed(false);
      await axios.put("http://localhost:4000/foods", {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
        id: id,
      });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["foods"],
        type: "active",
      });
      setIsPressed(true);
      await refetch();
      toast("🦄 Successfully updated.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (err) => {
      setIsPressed(true);
      toast.error(err?.message || "Failed to update dish info.", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
  return (
    <>
      {isPressed ? (
        <Formik
          validationSchema={foodRejex}
          initialValues={{
            foodName: foodName,
            price: price,
            ingredients: ingredients,
            image: image,
            category: category.id,
          }}
          onSubmit={async (values) => {
            updateDish({ ...values, id: _id });
          }}
        >
          {({ values, errors, setFieldValue, handleChange, handleSubmit }) => (
            <Dialog>
              <DialogTrigger asChild>
                <div className="absolute bg-white rounded-full p-2 bottom-4 right-4">
                  <Pen color="red" size={16} />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white rounded p-5">
                <DialogHeader>
                  <DialogTitle>Dish info</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit}
                  className="grid w-full items-center gap-4"
                >
                  <div className="w-full  flex">
                    <Label htmlFor="foodName">Dish name</Label>
                    <Input
                      id="foodName"
                      name="foodName"
                      placeholder="Type food name"
                      className="rounded border-gray-300"
                      onChange={handleChange}
                      value={values.foodName}
                    />
                    {errors.foodName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.foodName}
                      </p>
                    )}
                  </div>
                  <div className="flex">
                    <Label htmlFor="category">Dish category</Label>
                    <Select
                      value={values.category}
                      onValueChange={(value) => {
                        setFieldValue("category", value);
                      }}
                    >
                      <SelectTrigger
                        id="category"
                        className="rounded border-gray-300"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {categories.map((el, index) => (
                          <SelectItem key={index} value={el._id}>
                            {el.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </div>
                  <div className="w-full flex">
                    <Label htmlFor="price">Dish price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter price..."
                      className="rounded border-gray-300"
                      onChange={handleChange}
                      value={values.price}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      id="ingredients"
                      name="ingredients"
                      placeholder="List ingredients..."
                      className="rounded border-gray-300"
                      onChange={handleChange}
                      value={values.ingredients}
                    />
                    {errors.ingredients && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ingredients}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {values.image.length === 0 && (
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <Image className="text-gray-500" size={24} />
                        </div>
                        <div>
                          <h3 className="font-medium">Browse or Drop Image</h3>
                          <p className="text-sm text-gray-500">
                            Select an image file
                          </p>
                        </div>
                        <Input
                          hidden
                          type="file"
                          accept="image/*"
                          id="image"
                          name="image"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setFieldValue("image", reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Label>
                    )}
                    {values.image.length !== 0 && (
                      <div className="flex relative w-full h-[180px]">
                        <img
                          src={values.image}
                          alt="Food preview"
                          className="h-full w-full rounded border object-cover"
                        />
                        <XCircle
                          color="gray"
                          className="absolute top-5 right-5"
                          onClick={() => setFieldValue("image", "")}
                        />
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                  </div>
                  <DialogFooter className="w-full mt-4 ">
                    <div className="w-full mt-4 flex justify-between items-center">
                      <div
                        className="p-3"
                        onClick={() => deleteFood({ id: _id })}
                      >
                        <Trash color="red" />
                      </div>
                      <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={isPending}
                      >
                        {isPending ? "Uploading..." : "Update"}
                      </Button>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </Formik>
      ) : (
        <div></div>
      )}
    </>
  );
}
