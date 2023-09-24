import { ConfigProvider } from "antd";
import { AppRoutes } from "./routes";
import { Theme } from "./utils";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: Theme.primary.medium },
        components: { Button: { fontWeight: 600, primaryShadow: "0" } },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
