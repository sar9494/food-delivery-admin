import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { Plus, Image, XCircle } from "lucide-react";
import { uploadImageToCloudinary } from "@/utils/functions/uploadImage";
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

export function AddDishButton(props: { id: string; name: string }) {
  const { id, name } = props;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const addFoodItem = async (values: {
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:4000/foods", {
        foodName: values.foodName,
        price: values.price,
        image: values.image,
        ingredients: values.ingredients,
        category: id,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <Formik
      validationSchema={foodRejex}
      initialValues={{
        foodName: "",
        price: 0,
        ingredients: "",
        image: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          let imageUrl = values.image;

          if (imageFile && !values.image.startsWith("http")) {
            imageUrl =
              (await uploadImageToCloudinary(imageFile, setIsUploading)) || "";
          }

          await addFoodItem({
            ...values,
            image: imageUrl,
          });

          resetForm();
        } catch (error) {
          console.error("Form submission failed:", error);
        }
      }}
    >
      {({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
        touched,
      }) => (
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
              onSubmit={handleSubmit}
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
                    onChange={handleChange}
                    value={values.foodName}
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.foodName}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2">
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
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
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
                      className="h-full w-full rounded border object-scale-down"
                    />
                    <XCircle
                      color="gray"
                      className="absolute top-5 right-5"
                      onClick={() => setFieldValue("image", "")}
                    />
                  </div>
                )}
                <p className="text-red-500 text-sm">{errors.image}</p>
              </div>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Add Dish"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Formik>
  );
}
