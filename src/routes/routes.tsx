import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ContentContainer, PageHeader } from "components";
import { useAuthentication } from "contexts";
import {
  ChangePasswordPage,
  DashboardPage,
  LoginPage,
  PhotoPage,
  ProfileDetailsPage,
  ProfilesListPage,
  SystemPage,
  UpsertProfilePage,
} from "pages";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppPath } from "utils";

export const AppRoutes = () => {
  const [hasToken, setHasToken] = useState(true);
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setHasToken(!!token);
  }, [isAuthenticated]);

  const authRoute = (page: JSX.Element) => {
    return hasToken ? page : <Navigate to={AppPath.Login} />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <PageHeader />

        <Content>
          <ContentContainer>
            <Routes>
              <Route
                path={AppPath.Login}
                element={
                  !isAuthenticated ? (
                    <LoginPage />
                  ) : (
                    <Navigate to={AppPath.Dashboard} />
                  )
                }
              />
              <Route
                path={AppPath.Dashboard}
                element={authRoute(<DashboardPage />)}
              />
              <Route
                path={AppPath.ChangePassword}
                element={authRoute(<ChangePasswordPage />)}
              />
              <Route path={AppPath.Photo} element={authRoute(<PhotoPage />)} />
              <Route
                path={AppPath.System}
                element={authRoute(<SystemPage />)}
              />
              <Route
                path={AppPath.ProfilesList}
                element={authRoute(<ProfilesListPage />)}
              />
              <Route
                path={AppPath.CreateProfile}
                element={authRoute(<UpsertProfilePage />)}
              />
              <Route
                path={AppPath.EditProfile}
                element={authRoute(<UpsertProfilePage />)}
              />
              <Route
                path={AppPath.ProfileDetails}
                element={authRoute(<ProfileDetailsPage />)}
              />
              <Route
                path="*"
                element={authRoute(<Navigate to={AppPath.Dashboard} />)}
              />
            </Routes>
          </ContentContainer>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};
