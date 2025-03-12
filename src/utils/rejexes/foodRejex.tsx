import yup from "yup";
export const foodRejex = yup.object({
  foodName: yup.string().required(),
  price: yup.number().required().positive(),
});
