"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { HomeNaviagtion } from "@/components";
import { Profile } from "@/components/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { OrderProvider } from "@/provider/OrderProvider";
import { LoaderProvider } from "@/provider/LoadingProvider";

const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const tokenData = jwtDecode(token);
      console.log(tokenData);
    } catch (error) {
      console.error("Error validating token:", error);
      router.push("/login");
    }
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <LoaderProvider>
            <OrderProvider>
              <div className="flex">
                <HomeNaviagtion />
                <div className="bg-gray-200 p-5 w-full h-screen">
                  <div className="w-full flex justify-end">
                    <Profile />
                  </div>
                  {children}
                  <ToastContainer />
                </div>
              </div>
            </OrderProvider>
          </LoaderProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
