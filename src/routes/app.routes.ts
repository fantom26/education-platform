import { lazy } from "react";

export const AppRoutes = [
  {
    path: "/",
    tag: "home",
    title: "Home page",
    description: "Home page",
    component: lazy(() => import("../pages/home"))
  }
];
