import { Skeleton } from "antd";
import { useTimelapse } from "hooks";
import { useEffect, useRef } from "react";

export const TimeLapsePage = () => {
  const initialRender = useRef(true);
  const { getTimelapse, timelapse, isLoading } = useTimelapse();

  useEffect(() => {
    const getCurrentTimelapse = async () => {
      await getTimelapse();
    };

    if (initialRender.current) {
      initialRender.current = false;
      getCurrentTimelapse();
    }
  }, [getTimelapse]);

  const isPortrait = window.innerHeight > window.innerWidth;

  const width = isPortrait
    ? `${1.33 * window.innerWidth}px`
    : `${1.33 * (0.8 * window.innerHeight)}px`;

  const height = isPortrait
    ? `${window.innerWidth}px`
    : `${0.8 * window.innerHeight}px`;

  const videoStyle = { width, height };
  return (
    <div className="d-flex justify-content-center h-100">
      {isLoading ? (
        <Skeleton.Image active style={videoStyle} />
      ) : (
        timelapse && (
          <video width={width} height={height} controls autoPlay>
            <source src={timelapse} />
          </video>
        )
      )}
    </div>
  );
};
