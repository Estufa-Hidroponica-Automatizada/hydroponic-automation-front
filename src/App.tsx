import { App as AntdApp, ConfigProvider } from "antd";
import { AuthProvider } from "contexts";
import { AppRoutes } from "routes";
import { Theme } from "utils";

function App() {
  return (
    <AntdApp>
      <ConfigProvider
        theme={{
          token: { colorPrimary: Theme.primary.medium },
          components: { Button: { fontWeight: 600, primaryShadow: "0" } },
        }}
      >
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
