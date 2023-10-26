import styled from "styled-components";
import { Theme } from "utils";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  width: 100vw;
  padding: 1rem;
  background: ${Theme.colors.background.content};
  background-attachment: fixed;
`;

export const ContentCard = styled.div`
  background: ${Theme.colors.background.card};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  width: ${Theme.sizes.responsiveWidth};
`;
