import { Button, Skeleton } from "antd";
import { usePhoto } from "hooks";
import { useEffect, useRef } from "react";

export const PhotoPage = () => {
  const initialRender = useRef(true);

  const { getPhoto, photo, isLoading } = usePhoto();

  useEffect(() => {
    const getCurrentPhoto = async () => {
      await getPhoto();
    };

    if (initialRender.current) {
      initialRender.current = false;
      getCurrentPhoto();
    }
  }, [getPhoto]);

  const isPortrait = window.innerHeight > window.innerWidth;

  const height = isPortrait
    ? `${window.innerWidth / 1.33}px`
    : `${0.6 * window.innerHeight}px`;

  const width = isPortrait
    ? `${window.innerWidth}px`
    : `${1.33 * (0.6 * window.innerHeight)}px`;

  const photoStyle = { width, height };
  return (
    <div className="d-flex justify-content-center h-100">
      {isLoading ? (
        <Skeleton.Image active style={photoStyle} />
      ) : (
        photo && (
          <div className="d-flex flex-column gap-3">
            <Button type="primary">Baixar imagem</Button>

            <img alt="img" src={photo} style={photoStyle} />
          </div>
        )
      )}
    </div>
  );
};
