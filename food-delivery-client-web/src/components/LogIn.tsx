'use client'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export const LogIn = () => {
    const [useInfo,setUserInfo] = useState({
        email:"",
        password:""
    })

    const handleOnChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name==='email'){
            setUserInfo({...useInfo,email:e.target.value})
        }else{
            setUserInfo({...useInfo,password:e.target.value})
        }
    }
    const letsGoHandler = () =>{

    }
    useEffect(()=>{
        console.log(useInfo);
    },[useInfo])
  return (
    <div className="flex flex-col gap-6 w-[400px]">
      <Button className="w-fit border bg-white px-4 py-6">
        <ChevronLeft color="black " />
      </Button>
      <div>
        <p>
          <b>Log in</b>
        </p>
        <p>Log in to enjoy your favorite dishes.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="Enter your email address" name="email" onChange={handleOnChangeEmail} />
        <Input placeholder="Password" name="password" onChange={handleOnChangeEmail}/>
        <a className="underline" href="">
          Forgot password ?
        </a>
      </div>
      <Button>Let's Go</Button>
      <div className="flex gap-2">
        <p>Don’t have an account?</p>
        <a className="text-[#2563EB]" href="">
          Sign up
        </a>
      </div>
    </div>
  );
};
