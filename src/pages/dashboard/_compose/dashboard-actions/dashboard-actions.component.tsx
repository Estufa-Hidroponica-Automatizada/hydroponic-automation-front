import {
  CameraOutlined,
  DownOutlined,
  ReloadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";
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
  const navigate = useNavigate();

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
                key: AppPath.Photo,
                icon: <CameraOutlined />,
              },
              {
                label: "Time-lapse",
                key: AppPath.TimeLapse,
                icon: <VideoCameraOutlined />,
              },
            ],
            onClick: (option) => navigate(option.key),
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
