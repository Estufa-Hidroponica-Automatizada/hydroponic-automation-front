import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Typography } from "antd";
import { LogoIconSVG } from "components";
import { AuthContext } from "contexts";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppPath } from "routes";
import { Theme } from "utils";
import { HeaderContainer } from "./styles";

export const PageHeader = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HeaderContainer isAuthenticated={isAuthenticated}>
      {isAuthenticated && (
        <LeftOutlined
          style={{ color: Theme.colors.white, fontSize: "1.5rem" }}
          onClick={() => navigate(-1)}
        />
      )}

      <div className="d-flex gap-3">
        <Icon component={LogoIconSVG} />

        <Typography.Title
          level={1}
          style={{ color: Theme.colors.white, marginBottom: 0 }}
        >
          Estufa
        </Typography.Title>
      </div>

      {isAuthenticated && (
        <UserOutlined
          style={{ color: Theme.colors.white, fontSize: "1.5rem" }}
          onClick={() => navigate(AppPath.System)}
        />
      )}
    </HeaderContainer>
  );
};
