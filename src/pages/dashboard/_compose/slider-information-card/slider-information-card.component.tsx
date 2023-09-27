import { Button, Skeleton, Slider, Typography } from "antd";
import { useEffect, useState } from "react";
import { Limit } from "../../../../types";
import { Theme } from "../../../../utils";
import { SliderInformation } from "../../enum";
import { DashboardCard } from "../../styles";
import { SliderRange, SliderTitle, SliderUnity, getSliderMarkers } from "./utils";

interface SliderInformationCardProps {
  information: SliderInformation;
  isLoadingLimits: boolean;
  isLoadingReadData: boolean;
  limit: Limit;
  readValue: number;
}

export const SliderInformationCard = ({
  information,
  isLoadingLimits,
  isLoadingReadData,
  limit,
  readValue,
}: SliderInformationCardProps) => {

  const [savedRange, setSavedRange] = useState<number[]>([
    limit?.min,
    limit?.max,
  ]);
  const [minValue, setMinValue] = useState(limit?.min);
  const [maxValue, setMaxValue] = useState(limit?.max);

  useEffect(() => {
    if (limit?.min && limit?.max) {
      setMinValue(limit.min)
      setMaxValue(limit.max)
      setSavedRange([limit.min, limit.max])
    }
  }, [limit])

  useEffect(() => {
    setMarkers(getSliderMarkers(information, limit?.min, limit?.max, readValue));
  }, [limit, readValue])

  const isReadOnRange = readValue >= minValue && readValue <= maxValue;


  const [markers, setMarkers] = useState<Record<number, any>>(getSliderMarkers(information, limit?.min, limit?.max, readValue));

  const handleChange = (value: number[]) => {
    if (value[0] !== minValue) {
      setMinValue(value[0]);
    }
    if (value[1] !== maxValue) {
      setMaxValue(value[1]);
    }
    setMarkers(getSliderMarkers(information, value[0], value[1], readValue));
  };

  const showButtons = savedRange[0] !== minValue || savedRange[1] !== maxValue;

  const handleCancel = () => {
    setMinValue(savedRange[0]);
    setMaxValue(savedRange[1]);
  };

  const handleSave = () => { };

  return (
    <DashboardCard>
      <Typography.Title level={2} className="m-0 text-center">
        {SliderTitle[information]}
      </Typography.Title>

      {isLoadingReadData ? (
        <div className="d-flex flex-column align-items-center gap-1 py-2">
          <Skeleton.Input size="small" active />
          <Skeleton.Input size="small" active />
        </div>
      ) : (
        <div className="d-flex flex-column pt-1">
          <Typography.Text strong className="text-center">
            Medição atual: {readValue}
            {SliderUnity[information]}
          </Typography.Text>

          <Typography.Text strong className="text-center">
            Faixa atual: {savedRange[0]}
            {SliderUnity[information]} - {savedRange[1]}
            {SliderUnity[information]}
          </Typography.Text>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <Typography.Text strong className="mb-0">
          {SliderRange[information].min}
          {SliderUnity[information]}
        </Typography.Text>
        <Typography.Text strong className="mb-0">
          {SliderRange[information].max}
          {SliderUnity[information]}
        </Typography.Text>
      </div>

      {isLoadingLimits ? (
        <Skeleton.Input size="small" active block />
      ) : (
        <Slider
          {...SliderRange[information]}
          value={[minValue, maxValue]}
          marks={markers}
          className="mb-3"
          onChange={handleChange}
          range
        />
      )}

      {showButtons && (
        <div className="d-flex justify-content-center gap-2 pt-3 w-100">
          <Button
            type="primary"
            danger
            onClick={handleCancel}
            block
          >
            <strong>Cancelar</strong>
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: Theme.primary.medium }}
            onClick={handleSave}
            block
          >
            <strong>Salvar</strong>
          </Button>
        </div>
      )}
    </DashboardCard>
  );
};
