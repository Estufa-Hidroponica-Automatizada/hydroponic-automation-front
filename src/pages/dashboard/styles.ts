import styled from "styled-components";
import { Theme } from "../../utils";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const DashboardCard = styled.div`
  background: ${Theme.background.card};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 22rem;
`;
