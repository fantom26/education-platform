import { Navigate, Route, Routes } from "react-router-dom";
import { AppRoutes } from "routes";

import { MainLayout } from "layouts";

export const Router = () => {
  // Rendering routes
  const renderAppRoutes = () => AppRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.component />} />);

  return (
    <Routes>
      <Route element={<MainLayout />}>{renderAppRoutes()}</Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
