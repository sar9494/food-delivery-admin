"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUpStep2 = ({setStep}:{setStep:Function}) => {
  const [userInfo, setUserInfo] = useState({
    password: "",
    confirm: "",
  });
  const [error, setError] = useState({
    password: "",
    confirm: "",
  });
  const router = useRouter();

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setUserInfo({ ...userInfo, password: e.target.value });
    } else {
      setUserInfo({ ...userInfo, confirm: e.target.value });
    }
  };
  const letsGoHandler = () => {
    if (userInfo.password.length == 0 || userInfo.password.length < 8) {
      setError({ confirm: "don't match", password: "lenght" });
    } else if (userInfo.password !== userInfo.confirm) {
      setError({ password: "", confirm: "don't match" });
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex flex-col gap-6 w-[400px]">
      <Button className="w-fit border bg-white px-3 py-3">
        <ChevronLeft color="black " />
      </Button>
      <div>
        <p>
          <b>Create your account</b>
        </p>
        <p>Create a strong password with letters, numbers.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Input
            placeholder="Password"
            name="password"
            onChange={handleOnChangeEmail}
          />
          {error.password.includes("lenght") && (
            <p className="text-red-500">
              Weak password. Use numbers and symbols.
            </p>
          )}
        </div>
        <div>
          <Input
            placeholder="Confirm"
            name="confirm"
            onChange={handleOnChangeEmail}
          />
          {error.confirm.includes("match") && (
            <p className="text-red-500">
              Those password did’t match, Try again
            </p>
          )}
          {error.confirm.includes("lenght") && (
            <p className="text-red-500">
              Weak password. Use numbers and symbols.
            </p>
          )}
        </div>

        <label className="flex gap-2">
          <input type="checkbox" />
          <p>Show password</p>
        </label>
      </div>
      <Button onClick={() => letsGoHandler()}>Let's Go</Button>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link href={`/login`}>
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};
