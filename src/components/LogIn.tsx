"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userRejex } from "../utils/rejexes/userYup";
import { Formik } from "formik";

export const LogIn = () => {
  const router = useRouter();

  const logInHandler = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
      if (response.data.success === false) {
        console.log(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Formik
      validationSchema={userRejex}
      onSubmit={logInHandler}
      initialValues={{ email: "", password: "" }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 w-[400px]">
            <p>
              <b>Log in</b>
            </p>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter your email address"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <p className="text-red-500">{errors.email}</p>
              <Input
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <p className="text-red-500">{errors.password}</p>
              <a className="underline" href="">
                Forgot password ?
              </a>
            </div>
            <Button type="submit">Let's Go</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
