/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Plus, Image, XCircle } from "lucide-react";
import { uploadImageToCloudinary } from "@/utils/functions/uploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { foodRejex } from "@/utils/rejexes/foodRejex";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFood } from "@/provider/FoodProvider";
import { SubmitButton } from "./SubmitButton";
export function AddDishButton(props: { id: string; name: string }) {
  const { id, name } = props;
  const { refetch } = useFood();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPressed, setIsPressed] = useState(true);
  const queryClient = new QueryClient();

  const { mutate: addDish, isPending } = useMutation({
    mutationFn: async ({
      foodName,
      price,
      image,
      ingredients,
    }: {
      foodName: string;
      price: number;
      ingredients: string;
      image: string;
    }) => {
      setIsPressed(false);
      await axios.post(
        "https://food-delivery-service-bx3v.onrender.com/foods",
        {
          foodName: foodName,
          price: price,
          image: image,
          ingredients: ingredients,
          category: id,
        }
      );
    },

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["foods"],
        type: "active",
      });
      setIsPressed(true);
      await refetch();
      toast("🦄 Successfully added new dish.", {
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
      setIsPressed(true);
      toast.error(err?.message || "Failed to add new dish.", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
  const formik = useFormik({
    validationSchema: foodRejex,
    initialValues: {
      foodName: "",
      price: 0,
      ingredients: "",
      image: "",
    },
    onSubmit: async (values) => {
      try {
        let imageUrl = values.image;

        if (imageFile && !values.image.startsWith("http")) {
          imageUrl = (await uploadImageToCloudinary(imageFile)) || "";
        }

        addDish({
          ...values,
          image: imageUrl,
        });
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    },
  });
  return (
    <>
      {isPressed ? (
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
          <DialogContent className="bg-white rounded p-5">
            <DialogHeader>
              <DialogTitle>Add new Dish to {name}</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={formik.handleSubmit}
              className="grid w-full items-center gap-4"
            >
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2">
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
                <div className="w-full md:w-1/2">
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
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        console.log(file);

                        if (file) {
                          setImageFile(file);
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
                      className="h-full w-full rounded border object-scale-down"
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
              <SubmitButton isPending={isPending} place="add" />
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <div></div>
      )}
    </>
  );
}
