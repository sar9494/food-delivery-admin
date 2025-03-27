import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const path = usePathname();

  const { isExpired, reEvaluateToken } = useJwt(token || "");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        router.push("/login");
        setLoading(false);
        return;
      }

      reEvaluateToken(token);

      if (isExpired) {
        router.push("/login");
      } else {
        router.push(path || "/");
      }

      setLoading(false);
    };

    checkToken();
  }, [token, isExpired, router, path]);

  if (loading) {
    return <div>... LOADING</div>;
  }

  return <>{children}</>;
};
