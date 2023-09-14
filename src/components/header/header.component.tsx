import Icon from "@ant-design/icons/lib/components/Icon";
import { Typography } from "antd";
import React from "react";
import { Theme } from "../../utils";
import { LogoIconSVG } from "../icons/logo.icon";
import { HeaderContainer } from "./styles";

export const PageHeader: React.FC = () => {
  return (
    <HeaderContainer>
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
