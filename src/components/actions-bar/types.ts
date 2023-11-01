import { ReactNode } from "react";

export interface ActionsBarProps {
  buttons: [ActionButton, ActionButton];
}

interface ActionButton {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}
