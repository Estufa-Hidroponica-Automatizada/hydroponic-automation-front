import { Button, Slider, Typography } from "antd";
import React, { useState } from "react";
import { Theme } from "../../../../utils";
import { SliderInformation } from "../../enum";
import { DashboardCard } from "../../styles";
import { SliderRange, SliderTitle, SliderUnity } from "./utils";

interface SliderInformationCardProps {
  information: SliderInformation;
}

export const SliderInformationCard: React.FC<SliderInformationCardProps> = ({
  information,
}) => {
  const MOCK_VALUE = {
    min: information === SliderInformation.AirTemperature ? 16 : 2,
    max:
      information === SliderInformation.AirTemperature
        ? 33
        : information === SliderInformation.Humidity
        ? 73
        : information === SliderInformation.Condutivity
        ? 1957
        : 12,
    read:
      information === SliderInformation.AirTemperature
        ? 22
        : information === SliderInformation.Humidity
        ? 54
        : information === SliderInformation.Condutivity
        ? 1000
        : 8,
  };

  const [savedRange, setSavedRange] = useState<Number[]>([
    MOCK_VALUE.min,
    MOCK_VALUE.max,
  ]);
  const [minValue, setMinValue] = useState(MOCK_VALUE.min);
  const [maxValue, setMaxValue] = useState(MOCK_VALUE.max);

  const isReadOnRange =
    MOCK_VALUE.read >= minValue && MOCK_VALUE.read <= maxValue;

  const initialValue: Record<number, any> = {};
  initialValue[MOCK_VALUE.min] = `${MOCK_VALUE.min}${SliderUnity[information]}`;
  initialValue[MOCK_VALUE.max] = `${MOCK_VALUE.max}${SliderUnity[information]}`;
  initialValue[MOCK_VALUE.read] = {
    style: {
      color: isReadOnRange ? "green" : "red",
    },
    label: (
      <strong>
        {MOCK_VALUE.read}
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
    initialValue[MOCK_VALUE.read].style.color = isReadOnRange ? "green" : "red";
    setMarkers({ ...initialValue });
  };

  return (
    <DashboardCard>
      <Typography.Title level={2} className="m-0 text-center">
        {SliderTitle[information]}
      </Typography.Title>
      <Typography.Text strong className="text-center">
        Medição atual: {MOCK_VALUE.read}
        {SliderUnity[information]}
      </Typography.Text>
      <Slider
        range
        defaultValue={[MOCK_VALUE.min, MOCK_VALUE.max]}
        {...SliderRange[information]}
        marks={markers}
        className="mb-3"
        onChange={handleChange}
        // trackStyle={{ backgroundColor: Theme.primary.medium }}
        // handleStyle={{ backgroundColor: Theme.primary.medium }}
      />
      {savedRange[0] !== minValue ||
        (savedRange[1] !== maxValue && (
          <div className="d-flex justify-content-center gap-2 pt-2 w-100">
            <Button type="primary" style={{ backgroundColor: "red" }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: Theme.primary.medium }}
            >
              Salvar
            </Button>
          </div>
        ))}
    </DashboardCard>
  );
};
