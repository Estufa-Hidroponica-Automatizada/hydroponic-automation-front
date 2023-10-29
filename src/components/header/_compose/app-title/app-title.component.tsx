import Icon from "@ant-design/icons";
import { Typography } from "antd";
import { LogoIconSVG } from "components";
import { Theme } from "utils";

export const AppTitle = () => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
      <Icon component={LogoIconSVG} />

      <Typography.Title
        style={{ color: Theme.colors.white, margin: 0 }}
        level={1}
      >
        Estufa
      </Typography.Title>
    </div>
  );
};
