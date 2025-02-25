"use client";
import { useEffect } from "react";
import { HomeNaviagtion } from "@/components/index";
import { Header } from "@/app/(orders)/_features/Header";
import { LogIn } from "../components/LogIn";
export default function Home() {
  return (
    <div className="flex">
      <HomeNaviagtion />
      <div>
        <Header />
      </div>
    </div>
  );
}
