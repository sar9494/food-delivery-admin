'use client'
import { useState } from "react";
import { SignUp } from "../components/SignUp";
import { SignUpStep2 } from "../components/SignUpStep2";

export default function Home() {
  const [step,setStep] = useState(1)
  return (
    <div className="flex w-screen items-center justify-center py-5 ">
      <div className="flex w-[1300px] items-center justify-center gap-5">
        {
          step==1&&<SignUp setStep={setStep}/>
        }
        {
          step==2&&<SignUpStep2 setStep={setStep}/>
        }
      <img src="mainImage.png" alt="" />
      </div>
    </div>
  );
}
