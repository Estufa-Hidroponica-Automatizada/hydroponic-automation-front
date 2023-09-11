import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, LoginPage } from "../pages";
import { AppPath } from "./paths";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to={AppPath.Login} />} />
        <Route path={AppPath.Login} element={<LoginPage />} />
        <Route path={AppPath.Dashboard} element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};
