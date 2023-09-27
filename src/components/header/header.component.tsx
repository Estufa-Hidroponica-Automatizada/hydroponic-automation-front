import { LeftOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppPath } from "../../routes";
import { Theme } from "../../utils";
import { LogoIconSVG } from "../icons/logo.icon";
import { HeaderContainer } from "./styles";

export const PageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldRenderBackButton = location.pathname !== AppPath.Login

  return (
    <HeaderContainer>
      {shouldRenderBackButton &&
        <LeftOutlined style={{ color: Theme.white }} onClick={() => navigate(-1)} />
      }

      <Icon component={LogoIconSVG} />

      <Typography.Title
        level={1}
        style={{ color: Theme.white, marginBottom: 0 }}
      >
        Estufa
      </Typography.Title>
    </HeaderContainer>
  );
};
