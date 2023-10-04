import { Button, Typography } from "antd";
import { ContentCard } from "components";
import { useLogout } from "hooks";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";

export const ProfilePage = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      navigate(AppPath.Login);
    }
  };

  return (
    <ContentCard className="align-self-center">
      <div className="d-flex flex-column align-items-center gap-3 ">
        <div className="d-flex flex-column align-items-center gap-1 w-100">
          <Typography.Title level={2} className="m-0">
            Minha estufa
          </Typography.Title>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Nome de usuário
            </Typography.Title>
            <Typography.Text>user</Typography.Text>
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Senha
            </Typography.Title>
            <Typography.Link onClick={() => navigate(AppPath.ChangePassword)}>
              Alterar senha
            </Typography.Link>
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Perfil atual
            </Typography.Title>
            <Typography.Text>Perfil B</Typography.Text>
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <Typography.Title level={4} className="m-0">
              Dias do cultivo atual
            </Typography.Title>
            <Typography.Text>6</Typography.Text>
          </div>
        </div>
        <Button type="primary" onClick={handleLogout}>
          Desconectar
        </Button>
      </div>
    </ContentCard>
  );
};
