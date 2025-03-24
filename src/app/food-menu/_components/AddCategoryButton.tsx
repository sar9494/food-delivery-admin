import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
type AddCatergoryModalProps = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export const AddCategoryModal = ({ refetch }: AddCatergoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const queryClient = new QueryClient();

  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      setIsPressed(false);
      await axios.post("http://localhost:4000/category", {
        categoryName: name,
      });
    },
    onSuccess: async () => {
      // await timeout(3000);
      await queryClient.refetchQueries({
        queryKey: ["categories"],
        type: "active",
      });
      setIsPressed(true);

      await refetch();

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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="name">Category name</Label>
                  <Input
                    id="name"
                    placeholder="New category name"
                    className="rounded border-gray-300"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                  />
                </div>
              </div>
            </form>
            <DialogFooter>
              <button
                className="ml-[320px] rounded-[5px] mt-[50px] bg-black text-white px-[15px] py-[10px]"
                onClick={() => {
                  addCategory({ name: categoryName });
                }}
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add category"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div>kjsdfdhfbsk</div>
      )}
    </>
  );
};
