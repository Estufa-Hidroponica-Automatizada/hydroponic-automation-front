import styled from "styled-components";
import { Theme } from "../../utils";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100vw;
  padding: 1rem;
  background: ${Theme.background.content};
`;
