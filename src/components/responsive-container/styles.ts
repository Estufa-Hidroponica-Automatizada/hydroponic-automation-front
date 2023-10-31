import styled from "styled-components";
import { Theme } from "utils";

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ResponsiveActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  width: ${Theme.sizes.responsiveWidth};
`;
