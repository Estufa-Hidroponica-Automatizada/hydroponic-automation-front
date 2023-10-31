import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

interface IntegerInputProps {
  currentValue: number;
  handleChange: (newValue: number) => void;
  minValue?: number;
  maxValue?: number;
}

export const IntegerInput = ({
  currentValue,
  handleChange,
  minValue,
  maxValue,
}: IntegerInputProps) => {
  const disableMinus = currentValue === minValue;
  const disablePlus = currentValue === maxValue;

  return (
    <div className="d-flex justify-content-between align-items-center bg-white border rounded">
      <Button
        icon={<MinusOutlined />}
        shape="circle"
        type="text"
        onClick={() => handleChange(currentValue - 1)}
        disabled={disableMinus}
      />
      <Typography>{currentValue}</Typography>
      <Button
        icon={<PlusOutlined />}
        shape="circle"
        type="text"
        onClick={() => handleChange(currentValue + 1)}
        disabled={disablePlus}
      />
    </div>
  );
};
