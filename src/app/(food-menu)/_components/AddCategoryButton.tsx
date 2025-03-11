import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddCategoryButton() {
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
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 rounded-full"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
