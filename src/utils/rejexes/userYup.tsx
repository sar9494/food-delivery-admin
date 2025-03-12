import yup from "yup";
export const emailYup = yup.string().email().required();
export const userInfo = {
  email: emailYup,
  password: yup.string().min(8).required(),
};
