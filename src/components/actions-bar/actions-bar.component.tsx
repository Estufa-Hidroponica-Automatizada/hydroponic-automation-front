import { Button } from "antd";
import { ActionsBarProps } from "./types";

export const ActionsBar = ({ buttons }: ActionsBarProps) => {
  return (
    <div className="d-flex justify-content-center gap-2 pt-3 w-100">
      <Button
        type="primary"
        onClick={buttons[0].handleClick}
        disabled={buttons[0].disabled || buttons[1].loading}
        loading={buttons[0].loading}
        icon={buttons[0].icon}
        block
        ghost
      >
        {buttons[0].text}
      </Button>

      <Button
        type="primary"
        onClick={buttons[1].handleClick}
        disabled={buttons[1].disabled || buttons[0].loading}
        loading={buttons[1].loading}
        icon={buttons[1].icon}
        block
      >
        {buttons[1].text}
      </Button>
    </div>
  );
};
