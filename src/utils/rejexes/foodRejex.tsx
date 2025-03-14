import * as yup from "yup";
export const foodRejex = yup.object({
  foodName: yup.string().required("Food name is required."),
  price: yup
    .number()
    .required("Food price is required.")
    .positive("Price must be positive."),
  ingredients: yup.string().required("Food ingredients is required."),
  image: yup.string().required("Image is required."),
});
