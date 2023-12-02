import { App as AntdApp, ConfigProvider } from "antd";
import { AuthProvider, ProfileProvider } from "contexts";
import { AxiosProvider } from "contexts";
import { AppRoutes } from "routes";
import { Theme } from "utils";

function App() {
  return (
    <AntdApp>
      <ConfigProvider
        theme={{
          token: { colorPrimary: Theme.colors.primary.medium },
          components: {
            Button: { fontWeight: 600, primaryShadow: "0" },
            Form: { itemMarginBottom: 16 },
            Typography: { titleMarginTop: 0, titleMarginBottom: 0, margin: 0 },
          },
        }}
      >
        <AuthProvider>
          <AxiosProvider>
            <ProfileProvider>
              <AppRoutes />
            </ProfileProvider>
          </AxiosProvider>
        </AuthProvider>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
