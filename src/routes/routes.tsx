import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, LoginPage } from "../pages";
import { AppPath } from "./paths";
import { PhotoPage } from "../pages/photo";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={AppPath.Login} />} />
        <Route path={AppPath.Login} element={<LoginPage />} />
        <Route path={AppPath.Dashboard} element={<DashboardPage />} />
        <Route path={AppPath.Photo} element={<PhotoPage />} />
        <Route path={AppPath.TimeLapse} element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};
