import styled from "styled-components";
import { Theme } from "utils";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  width: 100vw;
  padding: 1rem;
  background: ${Theme.background.content};
  background-attachment: fixed;
`;

export const ContentCard = styled.div`
  background: ${Theme.background.card};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  width: ${window.innerWidth < 500 ? "100%" : "23rem"};
`;
