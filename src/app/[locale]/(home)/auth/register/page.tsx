import React from "react";
import Register from "@/components/Auth/Register";
import { PublicRoute } from "@/components/Auth/RouteGuard";

const page = () => {
  return (
    <PublicRoute>
      <Register />
    </PublicRoute>
  );
};

export default page;
