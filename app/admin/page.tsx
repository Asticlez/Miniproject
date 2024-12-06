"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin/dashboard when visiting /admin
    router.push("/admin/dashboard");
  }, [router]);

  return null; // Optionally, you can display a loading spinner here
};

export default Admin;