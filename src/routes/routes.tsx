import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ContentContainer, PageHeader } from "components";
import { AuthContext } from "contexts";
import {
  ChangePasswordPage,
  DashboardPage,
  LoginPage,
  PhotoPage,
  ProfilePage,
  TimeLapsePage,
} from "pages";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppPath } from "./paths";

export const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Layout>
        <PageHeader />

        <Content>
          <ContentContainer>
            <Routes>
              <Route path={AppPath.Login} element={<LoginPage />} />
              <Route path="*" element={<Navigate to={AppPath.Login} />} />
              {isAuthenticated && (
                <>
                  <Route path={AppPath.Dashboard} element={<DashboardPage />} />
                  <Route
                    path={AppPath.ChangePassword}
                    element={<ChangePasswordPage />}
                  />
                  <Route path={AppPath.Photo} element={<PhotoPage />} />
                  <Route path={AppPath.Profile} element={<ProfilePage />} />
                  <Route path={AppPath.TimeLapse} element={<TimeLapsePage />} />
                </>
              )}
            </Routes>
          </ContentContainer>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};
