import { Button, Skeleton, Typography } from "antd";
import { ContentCard, LimitsSlider } from "components";
import { useSetLimit } from "hooks";
import { useEffect, useState } from "react";
import { Limit, RangeInformation } from "types";
import { LimitsTitle, measureFormatter } from "utils";
import { SliderDatabaseName, getSliderMarkers } from "./utils";

interface SliderInformationCardProps {
  information: RangeInformation;
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
  const { isLoading, setLimit } = useSetLimit();
  const [savedRange, setSavedRange] = useState<number[]>([
    limit?.min,
    limit?.max,
  ]);
  const [minValue, setMinValue] = useState(limit?.min);
  const [maxValue, setMaxValue] = useState(limit?.max);

  useEffect(() => {
    if (limit?.min && limit?.max) {
      setMinValue(limit.min);
      setMaxValue(limit.max);
      setSavedRange([limit.min, limit.max]);
    }
  }, [limit]);

  useEffect(() => {
    setMarkers(
      getSliderMarkers(information, limit?.min, limit?.max, readValue)
    );
  }, [limit, readValue]);

  const [markers, setMarkers] = useState<Record<number, any>>(
    getSliderMarkers(information, limit?.min, limit?.max, readValue)
  );

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

  const handleSave = async () => {
    const response = await setLimit(SliderDatabaseName[information], {
      min: minValue,
      max: maxValue,
    });
    if (response) {
      setSavedRange([minValue, maxValue]);
    }
  };

  return (
    <ContentCard>
      <div className="d-flex flex-column justify-content-between h-100">
        <Typography.Title level={2} className="m-0 text-center">
          {LimitsTitle[information]}
        </Typography.Title>

        {isLoadingReadData ? (
          <div className="d-flex flex-column align-items-center gap-1 py-2">
            <Skeleton.Input size="small" active />
            <Skeleton.Input size="small" active />
          </div>
        ) : (
          <div className="d-flex flex-column pt-1">
            <Typography.Text strong className="text-center">
              Medição atual: {measureFormatter(readValue, information)}
            </Typography.Text>

            <Typography.Text strong className="text-center">
              Faixa atual: {measureFormatter(savedRange[0], information)} -{" "}
              {measureFormatter(savedRange[1], information)}
            </Typography.Text>
          </div>
        )}

        <LimitsSlider
          handleChange={handleChange}
          information={information}
          isLoading={isLoadingLimits}
          marks={markers}
          values={[minValue, maxValue]}
        />

        {showButtons && (
          <div className="d-flex justify-content-center gap-2 pt-3 w-100">
            <Button type="primary" danger onClick={handleCancel} block>
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              loading={isLoading}
              block
            >
              Salvar
            </Button>
          </div>
        )}
      </div>
    </ContentCard>
  );
};
