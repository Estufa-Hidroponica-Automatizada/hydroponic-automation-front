import { ReactNode } from "react";

export interface ActionsBarProps {
  buttons: [ActionButton, ActionButton];
  notPadding?: boolean;
}

interface ActionButton {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}
