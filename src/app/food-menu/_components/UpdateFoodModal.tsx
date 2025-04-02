import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { foodRejex } from "@/utils/rejexes/foodRejex";
import { Food, useFood } from "@/provider/FoodProvider";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCategory } from "@/provider/CategoryProvider";
import { FoodSchema } from "@/provider/FoodProvider";
import { SubmitButton } from "./SubmitButton";
export function UpdateFoodPage(props: { food: Food }) {
  const { categories, refetch } = useCategory();
  const { updateFoodInfo, deleteFood } = useFood();
  const { foodName, price, ingredients, image, category, _id } = props.food;
  const [isPressed, setIsPressed] = useState(true);
  const queryClient = new QueryClient();
  const { mutate: updateDish, isPending } = useMutation({
    mutationFn: async (newInfo: FoodSchema) => {
      setIsPressed(false);
      updateFoodInfo(newInfo);
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
  const { mutate: deleteDish } = useMutation({
    mutationFn: async (newInfo: { id: string }) => {
      setIsPressed(false);
      deleteFood(newInfo);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["foods"],
        type: "active",
      });
      await refetch();
      toast("🦄 Successfully deleted.", {
        position: "top-center",
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
      toast.error(err?.message || "Failed to update dish info.", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
  const formik = useFormik({
    validationSchema: foodRejex,
    initialValues: {
      foodName: foodName,
      price: price,
      ingredients: ingredients,
      image: image,
      category: category.id,
    },
    onSubmit: (values) => updateDish({ ...values, id: _id }),
  });
  return (
    <>
      {isPressed ? (
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
              onSubmit={formik.handleSubmit}
              className="grid w-full items-center gap-4"
            >
              <div className="w-full  flex">
                <Label htmlFor="foodName">Dish name</Label>
                <Input
                  id="foodName"
                  name="foodName"
                  placeholder="Type food name"
                  className="rounded border-gray-300"
                  onChange={formik.handleChange}
                  value={formik.values.foodName}
                />
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.foodName}
                </p>
              </div>
              <div className="flex">
                <Label htmlFor="category">Dish category</Label>
                <Select
                  value={formik.values.category}
                  onValueChange={(value) => {
                    formik.setFieldValue("category", value);
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
                <p className="text-red-500">{formik.errors.category}</p>
              </div>
              <div className="w-full flex">
                <Label htmlFor="price">Dish price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price..."
                  className="rounded border-gray-300"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.price}
                </p>
              </div>
              <div>
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  placeholder="List ingredients..."
                  className="rounded border-gray-300"
                  onChange={formik.handleChange}
                  value={formik.values.ingredients}
                />
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.ingredients}
                </p>
              </div>
              <div className="space-y-2">
                {formik.values.image.length === 0 && (
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
                            formik.setFieldValue(
                              "image",
                              reader.result as string
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Label>
                )}
                {formik.values.image.length !== 0 && (
                  <div className="flex relative w-full h-[180px]">
                    <img
                      src={formik.values.image}
                      alt="Food preview"
                      className="h-full w-full rounded border object-cover"
                    />
                    <XCircle
                      color="gray"
                      className="absolute top-5 right-5"
                      onClick={() => formik.setFieldValue("image", "")}
                    />
                  </div>
                )}
                <p className="text-red-500 text-sm">{formik.errors.image}</p>
              </div>
              <DialogFooter className="w-full mt-4 ">
                <div className="w-full mt-4 flex justify-between items-center">
                  <DialogClose>
                    <div
                      className="p-3"
                      onClick={() => deleteDish({ id: _id })}
                    >
                      <Trash color="red" />
                    </div>
                  </DialogClose>

                  <SubmitButton place="update" isPending={isPending} />
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <div></div>
      )}
    </>
  );
}
