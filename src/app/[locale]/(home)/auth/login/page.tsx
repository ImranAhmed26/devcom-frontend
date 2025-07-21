import React from "react";
import Login from "@/components/Auth/Login";
import { PublicRoute } from "@/components/Auth/RouteGuard";

const page = () => {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
};

export default page;
