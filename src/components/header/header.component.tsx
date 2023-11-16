import { Button } from "antd";
import { AuthContext } from "contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";
import { AppTitle } from "./_compose/app-title";
import { BackButton, HeaderContainer, UserButton } from "./styles";

export const PageHeader = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer isAuthenticated={isAuthenticated}>
      {isAuthenticated && <BackButton onClick={() => navigate(-1)} />}

      {isAuthenticated ? (
        <Button
          type="text"
          onClick={() => navigate(AppPath.Dashboard)}
          size="large"
          className="d-flex align-items-center justify-content-center gap-3"
        >
          <AppTitle />
        </Button>
      ) : (
        <AppTitle />
      )}

      {isAuthenticated && (
        <UserButton onClick={() => navigate(AppPath.System)} />
      )}
    </HeaderContainer>
  );
};
