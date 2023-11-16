import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { ResponsiveActionsContainer } from "components";
import { ProfileContext, blankProfileData } from "contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";

interface DashboardActionsProps {
  handleChangeFilter: React.Dispatch<React.SetStateAction<string>>;
  handleReloadData: () => void;
  isLoading: boolean;
}

export const ProfilesListActions = ({
  handleChangeFilter,
  handleReloadData,
  isLoading,
}: DashboardActionsProps) => {
  const navigate = useNavigate();
  const { setProfileData } = useContext(ProfileContext);

  const handleCreateProfileClick = () => {
    setProfileData(blankProfileData);
    navigate(AppPath.CreateProfile);
  };

  return (
    <ResponsiveActionsContainer className="flex-column gap-3 pb-3">
      <div className="d-flex justify-content-center gap-3">
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
          onClick={handleCreateProfileClick}
          disabled={isLoading}
          block
        >
          Criar perfil
        </Button>
      </div>

      <Input
        placeholder="Procurar perfil pelo nome"
        prefix={<SearchOutlined className="pe-1" />}
        onChange={(event) =>
          handleChangeFilter(event.target.value.toLowerCase() ?? "")
        }
        allowClear
      />
    </ResponsiveActionsContainer>
  );
};
