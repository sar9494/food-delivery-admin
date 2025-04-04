"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userRejex } from "../utils/rejexes/userYup";
import { useFormik } from "formik";

export const LogIn = () => {
  const router = useRouter();

  const logInHandler = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const response = await axios.post(
        "https://food-delivery-service-bx3v.onrender.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/food-menu");
      }
      if (response.data.success === false) {
        console.log(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const formik = useFormik({
    validationSchema: userRejex,
    onSubmit: logInHandler,
    initialValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6 w-[400px]">
        <p>
          <b>Log in</b>
        </p>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter your email address"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p className="text-red-500">{formik.errors.email}</p>
          <Input
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p className="text-red-500">{formik.errors.password}</p>
          <a className="underline" href="">
            Forgot password ?
          </a>
        </div>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};
