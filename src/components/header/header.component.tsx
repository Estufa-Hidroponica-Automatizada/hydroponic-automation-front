import { Typography } from "antd";
import React from "react";
import { Theme } from "../../utils/theme";
import { HeaderContainer, HeaderIcon } from "./styles";

export const PageHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderIcon />
      <Typography.Title
        level={1}
        style={{ color: Theme.white, marginBottom: 0 }}
      >
        WebApp Estufa
      </Typography.Title>
    </HeaderContainer>
  );
};
