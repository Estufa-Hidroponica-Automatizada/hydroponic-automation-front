import { Button } from "antd";
import { ActionsBarProps } from "./types";

export const ActionsBar = ({ buttons }: ActionsBarProps) => {
  return (
    <div className="d-flex justify-content-center gap-2 pt-3 w-100">
      <Button
        type="primary"
        onClick={buttons[0].handleClick}
        disabled={buttons[0].disabled}
        loading={buttons[0].loading}
        block
        ghost
      >
        {buttons[0].text}
      </Button>

      <Button
        type="primary"
        onClick={buttons[1].handleClick}
        disabled={buttons[1].disabled}
        loading={buttons[1].loading}
        block
      >
        {buttons[1].text}
      </Button>
    </div>
  );
};
