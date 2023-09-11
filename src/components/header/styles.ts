import { SlidersOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import styled from "styled-components";
import { Theme } from "../../utils/theme";

export const HeaderContainer = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${Theme.primary.medium};
`;

export const HeaderIcon = styled(SlidersOutlined)`
  color: ${Theme.white};
  font-size: 2.1rem;
`;