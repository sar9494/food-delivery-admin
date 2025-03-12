import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Food } from "@/utils/types/types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function AddDishButton() {
  const [foodInfo, setFoodInfo] = useState();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className=" bg-white rounded p-5">
        <DialogHeader>
          <DialogTitle>Add new Dish to</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-5">
              <div className="w-1/2">
                <Label htmlFor="name">Dish name</Label>
                <Input
                  id="name"
                  placeholder="Type food name"
                  className="rounded border-gray-300"
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="price">Dish name</Label>
                <Input
                  id="price"
                  placeholder="Enter price..."
                  className="rounded border-gray-300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea placeholder="List ingredients..." name="ingredients" />
            </div>
            <div>
              <Label htmlFor="image">Food image</Label>
              {}
            </div>
            <div className="flex space-y-1.5 items-center">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger
                  id="framework"
                  className="rounded border-gray-300"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="rounded border-gray-300 bg-white"
                >
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" className="bg-black text-white">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
