import { ReloadOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { ActionsBar, ResponsiveActionsContainer } from "components";
import { usePhoto } from "hooks";
import { useEffect, useRef } from "react";
import { handleDownload } from "utils";

export const PhotoPage = () => {
  const initialRender = useRef(true);
  const { getPhoto, isLoading, photo } = usePhoto();

  const getCurrentPhoto = async () => {
    await getPhoto();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      getCurrentPhoto();
    }
  }, [getPhoto]);

  const isPortrait = window.innerHeight > window.innerWidth;

  const height = isPortrait
    ? `${(0.75 * window.innerWidth) / 1.33}px`
    : `${0.75 * window.innerHeight}px`;

  const width = isPortrait
    ? `${0.75 * window.innerWidth}px`
    : `${1.33 * (0.75 * window.innerHeight)}px`;

  const photoStyle = { width, height };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 h-100">
      <ResponsiveActionsContainer>
        <ActionsBar
          buttons={[
            {
              text: "Recarregar imagem",
              handleClick: getCurrentPhoto,
              loading: isLoading,
              icon: <ReloadOutlined />,
            },
            {
              text: "Baixar imagem",
              handleClick: () => handleDownload("jpeg", photo),
              disabled: !photo,
            },
          ]}
          notPadding
        />
      </ResponsiveActionsContainer>
      {isLoading ? (
        <Skeleton.Image active style={photoStyle} />
      ) : (
        photo && <img src={photo} alt="img" style={photoStyle} />
      )}
    </div>
  );
};
