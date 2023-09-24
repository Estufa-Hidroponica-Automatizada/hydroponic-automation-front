import { Button, Skeleton, Slider, Typography } from "antd";
import React, { useState } from "react";
import { Limit } from "../../../../types";
import { Theme } from "../../../../utils";
import { SliderInformation } from "../../enum";
import { DashboardCard } from "../../styles";
import { SliderRange, SliderTitle, SliderUnity } from "./utils";

interface SliderInformationCardProps {
  information: SliderInformation;
  isLoading: boolean;
  limit: Limit;
  readValue: number;
}

export const SliderInformationCard: React.FC<SliderInformationCardProps> = ({
  information,
  isLoading,
  limit,
  readValue,
}) => {
  const minLimitValue = limit?.min ?? 0;
  const maxLimitValue = limit?.max ?? 0;

  const [savedRange, setSavedRange] = useState<number[]>([
    minLimitValue,
    maxLimitValue,
  ]);
  const [minValue, setMinValue] = useState(minLimitValue);
  const [maxValue, setMaxValue] = useState(maxLimitValue);

  const isReadOnRange = readValue >= minValue && readValue <= maxValue;

  const initialValue: Record<number, any> = {};
  initialValue[minLimitValue] = " ";
  initialValue[maxLimitValue] = " ";
  initialValue[readValue] = {
    style: {
      color: isReadOnRange ? "green" : "red",
    },
    label: (
      <strong>
        {readValue}
        {SliderUnity[information]}
      </strong>
    ),
  };

  const [markers, setMarkers] = useState<Record<number, any>>({
    ...initialValue,
  });

  const handleChange = (value: number[]) => {
    if (value[0] !== minValue) {
      setMinValue(value[0]);
    }
    if (value[1] !== maxValue) {
      setMaxValue(value[1]);
    }
    initialValue[readValue].style.color = isReadOnRange ? "green" : "red";
    setMarkers({ ...initialValue });
  };

  const showButtons = savedRange[0] !== minValue || savedRange[1] !== maxValue;

  const handleCancel = () => {
    setMinValue(savedRange[0]);
    setMaxValue(savedRange[1]);
  };

  const handleSave = () => {};

  return (
    <DashboardCard>
      <Typography.Title level={2} className="m-0 text-center">
        {SliderTitle[information]}
      </Typography.Title>

      {isLoading ? (
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

      {isLoading ? (
        <Skeleton.Input size="small" active block />
      ) : (
        <Slider
          {...SliderRange[information]}
          // defaultValue={[minValue, maxValue]} TO DO: check if can remove this props
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
            style={{ backgroundColor: "red" }}
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
