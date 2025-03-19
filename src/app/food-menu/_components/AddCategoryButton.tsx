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
import axios from "axios";

export function AddCategoryButton() {
  const [categoryName, setCategoryName] = useState("");
  const inputHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoryName(e.target.value);
    console.log(e.target.value);
  };
  const addCategoryHandler = async () => {
    await axios.post("http://localhost:4000/category", {
      categoryName: categoryName,
    });
  };
  return (
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
                onChange={inputHandler}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 rounded-full"
            onClick={addCategoryHandler}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
