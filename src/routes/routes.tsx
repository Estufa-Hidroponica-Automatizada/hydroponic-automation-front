import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ContentContainer, PageHeader } from "components";
import { AuthContext } from "contexts";
import {
  ChangePasswordPage,
  DashboardPage,
  LoginPage,
  PhotoPage,
  ProfileDetailsPage,
  ProfilesListPage,
  SystemPage,
  TimeLapsePage,
  UpsertProfilePage,
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
              {isAuthenticated ? (
                <>
                  <Route path={AppPath.Dashboard} element={<DashboardPage />} />
                  <Route
                    path={AppPath.ChangePassword}
                    element={<ChangePasswordPage />}
                  />
                  <Route path={AppPath.Photo} element={<PhotoPage />} />
                  <Route path={AppPath.TimeLapse} element={<TimeLapsePage />} />
                  <Route path={AppPath.System} element={<SystemPage />} />
                  <Route
                    path={AppPath.ProfilesList}
                    element={<ProfilesListPage />}
                  />
                  <Route
                    path={AppPath.CreateProfile}
                    element={<UpsertProfilePage />}
                  />
                  <Route
                    path={AppPath.EditProfile}
                    element={<UpsertProfilePage />}
                  />
                  <Route
                    path={AppPath.ProfileDetails}
                    element={<ProfileDetailsPage />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to={AppPath.Dashboard} />}
                  />
                </>
              ) : (
                <>
                  <Route path={AppPath.Login} element={<LoginPage />} />
                  <Route path="*" element={<Navigate to={AppPath.Login} />} />
                </>
              )}
            </Routes>
          </ContentContainer>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};
