import { Skeleton } from "antd";
import { usePhoto } from "hooks";
import { useEffect, useRef, useState } from "react";

export const PhotoPage = () => {
  const initialRender = useRef(true);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

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

  const width = isPortrait
    ? `${1.33 * window.innerWidth}px`
    : `${1.33 * (0.8 * window.innerHeight)}px`;

  const height = isPortrait
    ? `${window.innerWidth}px`
    : `${0.8 * window.innerHeight}px`;

  const photoStyle = { width, height, rotate: isPortrait ? "90deg" : "0deg" };
  return (
    <div className="d-flex justify-content-center h-100">
      {isLoading ? (
        <Skeleton.Image active style={photoStyle} />
      ) : (
        photo && <img alt="img" src={photo} style={photoStyle} />
      )}
    </div>
  );
};
