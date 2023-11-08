import { ReloadOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { ActionsBar, ResponsiveActionsContainer } from "components";
import dayjs from "dayjs";
import { usePhoto } from "hooks";
import { useEffect, useRef } from "react";

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

  // TO DO: adjust size
  const height = isPortrait
    ? `${window.innerWidth / 1.33}px`
    : `${0.75 * window.innerHeight}px`;

  const width = isPortrait
    ? `${window.innerWidth}px`
    : `${1.33 * (0.75 * window.innerHeight)}px`;

  const photoStyle = { width, height };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = photo ?? "";
    a.download = `${dayjs().format("DD-MM-YYYY-hhmm")}.jpeg`;
    a.click();
  };

  return (
    <div className="d-flex flex-column justify-content-center gap-3 h-100">
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
              handleClick: handleDownload,
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
