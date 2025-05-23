import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCategory } from "@/provider/CategoryProvider";
import { useFormik } from "formik";
import { categoryRejex } from "@/utils/rejexes/foodRejex";
import { SubmitButton } from "./SubmitButton";

export const AddCategoryModal = () => {
  const [isPressed, setIsPressed] = useState(true);
  const queryClient = new QueryClient();
  const { addCategory } = useCategory();
  const { mutate: addNewCategory, isPending } = useMutation({
    mutationFn: async ({ categoryName }: { categoryName: string }) => {
      setIsPressed(false);
      addCategory({ categoryName: categoryName });
    },
    onSuccess: async () => {
      // await timeout(3000);
      await queryClient.refetchQueries({
        queryKey: ["categories"],
        type: "active",
      });
      setIsPressed(true);

      toast("🦄 Successfully added category", {
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
      toast.error(err?.message || "Failed to add category", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
  const formik = useFormik({
    validationSchema: categoryRejex,
    initialValues: {
      categoryName: "",
    },
    onSubmit: (name) => addNewCategory(name),
  });
  return (
    <>
      {isPressed ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-500 rounded-full hover:bg-red-200">
              <Plus color="white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[470px] bg-white rounded p-5">
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="name">Category name</Label>
                  <Input
                    id="name"
                    name="categoryName"
                    placeholder="New category name"
                    className="rounded border-gray-300"
                    onChange={formik.handleChange}
                    value={formik.values.categoryName}
                  />
                </div>
              </div>
              <SubmitButton isPending={isPending} place="add" />
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <div>...</div>
      )}
    </>
  );
};
