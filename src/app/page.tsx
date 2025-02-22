"use client";
import { useEffect } from "react";
import axios from "axios";
export default function Home() {
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login");
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}
