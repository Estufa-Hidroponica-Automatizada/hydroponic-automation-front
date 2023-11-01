export interface ActionsBarProps {
  buttons: [ActionButton, ActionButton];
}

interface ActionButton {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}
