import { App as AntdApp, ConfigProvider } from "antd";
import { AuthProvider, ProfileProvider } from "contexts";
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
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <AuthProvider>
          <ProfileProvider>
            <AppRoutes />
          </ProfileProvider>
        </AuthProvider>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
