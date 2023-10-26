import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ResponsiveActionsContainer } from "components";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";

interface DashboardActionsProps {
  handleReloadData: () => void;
  isLoading: boolean;
}

export const ProfilesListActions = ({
  handleReloadData,
  isLoading,
}: DashboardActionsProps) => {
  const navigate = useNavigate();

  return (
    <ResponsiveActionsContainer className="gap-3 pb-3">
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={handleReloadData}
        loading={isLoading}
        block
        ghost
      >
        Recarregar lista
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate(AppPath.CreateProfile)}
        disabled={isLoading}
        block
      >
        Criar perfil
      </Button>
    </ResponsiveActionsContainer>
  );
};
