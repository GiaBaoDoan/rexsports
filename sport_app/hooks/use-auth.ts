// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await .get("/api/auth/me", { withCredentials: true });
//         setUser(res.data);
//       } catch (error) {
//         router.push("/login"); // Chuyển hướng về login nếu chưa đăng nhập
//       }
//     };

//     checkAuth();
//   }, [router]);

//   return { user };
// };
