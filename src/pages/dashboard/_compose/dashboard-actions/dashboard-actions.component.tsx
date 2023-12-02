import {
  CameraOutlined,
  DownOutlined,
  ReloadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography } from "antd";
import dayjs from "dayjs";
import { useTimelapse } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";
import { DashboardActionsContainer } from "./styles";

interface DashboardActionsProps {
  handleReloadData: () => void;
  isLoading: boolean;
  hasError: boolean;
}

export const DashboardActions = ({
  handleReloadData,
  isLoading,
  hasError,
}: DashboardActionsProps) => {
  const { getTimelapse, timelapse } = useTimelapse();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDropdownClick = async (option: any) => {
    if (option.key === "photo") {
      navigate(AppPath.Photo);
    } else {
      await getTimelapse();
      setIsDownloading(true);
    }
  };

  useEffect(() => {
    if (isDownloading && timelapse) {
      const a = document.createElement("a");
      a.href = timelapse;
      a.download = `${dayjs().format("DD-MM-YYYY-hhmm")}.mp4`;
      a.click();
      setIsDownloading(false);
    }
  }, [timelapse]);

  return (
    <DashboardActionsContainer className="gap-2">
      <div className="d-flex align-items-center gap-3">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleReloadData}
          loading={isLoading}
          block
          ghost
        >
          Recarregar dados
        </Button>

        <Dropdown
          menu={{
            items: [
              {
                label: "Ao vivo",
                key: "photo",
                icon: <CameraOutlined />,
              },
              {
                label: "Time-lapse",
                key: "timelapse",
                icon: <VideoCameraOutlined />,
              },
            ],
            onClick: handleDropdownClick,
          }}
          trigger={["click"]}
        >
          <Button type="primary" icon={<DownOutlined />} block>
            Visualizar estufa
          </Button>
        </Dropdown>
      </div>

      {hasError && (
        <Typography.Title level={3} className="text-center">
          Ocorreu um erro ao buscar os dados do Dashboard
        </Typography.Title>
      )}
    </DashboardActionsContainer>
  );
};
