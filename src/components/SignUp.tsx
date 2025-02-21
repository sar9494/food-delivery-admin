"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUp = ({setStep}:{setStep:Function}) => {
  const [useInfo, setUserInfo] = useState({
    email: "",
  });
  const [error,setError] = useState("")
  const router = useRouter();

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...useInfo, email: e.target.value });
  };
  const letsGoHandler = () => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(useInfo.email.length===0){
        setError("lenght")
    }else if (!checkEmail.test(useInfo.email)) {
        setError("type")
    }else{
      setError("")
        setStep(2)
    }
  };
  useEffect(() => {
    console.log(useInfo);
  }, [useInfo]);
  return (
    <div className="flex flex-col gap-6 w-[400px]">
      <Button className="w-fit border bg-white px-3 py-3">
        <ChevronLeft color="black " />
      </Button>
      <div>
        <p>
          <b>Create your account</b>
        </p>
        <p>Sign up to explore your favorite dishes.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter your email address"
          name="email"
          onChange={handleOnChangeEmail}
        />
        {
        error.length!==0&&<p className="text-red-500">Invalid email. Use a format like example@email.com</p>
        }
        <a className="underline" href="">
          Forgot password ?
        </a>
      </div>
      <Button onClick={letsGoHandler}>Let's Go</Button>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link href={`/login`}>
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};
