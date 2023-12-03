import { Form, Skeleton, Slider, Typography } from "antd";
import { RangeInformation } from "types";
import { LimitsRange, LimitsStep, measureFormatter } from "utils";

interface LimitsSliderProps {
  handleChange?: (values: number[]) => void;
  formId?: number;
  information: RangeInformation;
  isLoading?: boolean;
  marks?: Record<string | number, any>;
  values?: [number, number];
}

export const LimitsSlider = ({
  handleChange,
  formId,
  information,
  isLoading,
  marks,
  values,
}: LimitsSliderProps) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <Typography.Text strong className="mb-0">
          {measureFormatter(LimitsRange[information].min, information)}
        </Typography.Text>
        <Typography.Text strong className="mb-0">
          {measureFormatter(LimitsRange[information].max, information)}
        </Typography.Text>
      </div>

      {isLoading ? (
        <Skeleton.Input size="small" active block />
      ) : formId !== undefined ? (
        <Form.Item
          name={formId}
          initialValue={[
            LimitsRange[information].min,
            LimitsRange[information].max,
          ]}
        >
          <Slider
            {...LimitsRange[information]}
            className="mt-1 mb-3"
            step={LimitsStep[information]}
            range
          />
        </Form.Item>
      ) : (
        <Slider
          {...LimitsRange[information]}
          value={values}
          marks={marks}
          className="mt-1 mb-3"
          onChange={handleChange}
          step={LimitsStep[information]}
          range
        />
      )}
    </div>
  );
};
