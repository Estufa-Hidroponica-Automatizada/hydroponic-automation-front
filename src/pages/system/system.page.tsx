import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Skeleton, Typography } from "antd";
import { ActionsBar, ContentCard } from "components";
import {
  UpsertProfileStep,
  blankProfileData,
  useAuthentication,
  useProfile,
} from "contexts";
import { useGetCurrentProfile, useLogout } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";

export const SystemPage = () => {
  const { setFormStep, setProfileData } = useProfile();
  const { user } = useAuthentication();
  const navigate = useNavigate();

  const { logout } = useLogout();
  const {
    currentProfile,
    getCurrentProfile,
    isLoading: isLoadingCurrentProfile,
  } = useGetCurrentProfile();

  const getSystemInformation = async () => {
    await getCurrentProfile();
  };

  useEffect(() => {
    getSystemInformation();
  }, [getCurrentProfile]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ContentCard className="align-self-center">
      <div className="d-flex flex-column align-items-center gap-3">
        <div className="d-flex flex-column align-items-center gap-1 w-100">
          <Typography.Title level={2} className="mt-0 text-center">
            Minha estufa
          </Typography.Title>

          <Typography.Title level={3} className="m-0 text-center">
            Dados do sistema
          </Typography.Title>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Nome de usuário
            </Typography.Title>
            <Typography.Text>{user}</Typography.Text>
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Senha
            </Typography.Title>
            <Typography.Link
              onClick={() => navigate(AppPath.ChangePassword)}
              className="m-0"
            >
              Alterar senha
            </Typography.Link>
          </div>

          <Button type="primary" onClick={handleLogout} block className="my-1">
            Desconectar
          </Button>

          <Divider className="my-1" />

          <Typography.Title level={3} className="m-0 text-center">
            Dados do perfil
          </Typography.Title>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Perfil atual
            </Typography.Title>
            {isLoadingCurrentProfile ? (
              <Skeleton.Input size="small" active />
            ) : (
              <Typography.Text>{currentProfile.name}</Typography.Text>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Dias no perfil atual
            </Typography.Title>
            {isLoadingCurrentProfile ? (
              <Skeleton.Input size="small" active />
            ) : (
              <Typography.Text>{currentProfile.days ?? 0} dias</Typography.Text>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Duração (em semanas)
            </Typography.Title>
            {isLoadingCurrentProfile ? (
              <Skeleton.Input size="small" active />
            ) : (
              <Typography.Text>
                {currentProfile.totalWeeks ?? 0} semanas
              </Typography.Text>
            )}
          </div>

          <ActionsBar
            buttons={[
              {
                text: "Criar perfil",
                handleClick: () => {
                  setFormStep(UpsertProfileStep.ProfileInfo);
                  setProfileData(blankProfileData);
                  navigate(AppPath.CreateProfile);
                },
                icon: <PlusOutlined />,
              },
              {
                text: "Lista de perfis",
                handleClick: () => navigate(AppPath.ProfilesList),
              },
            ]}
          />
        </div>
      </div>
    </ContentCard>
  );
};
