import { Button } from "antd";

interface UpsertProfileFooterProps {
  handleBack: () => void;
  handleContinue?: () => void;
}

export const UpsertProfileFooter = ({
  handleBack,
  handleContinue,
}: UpsertProfileFooterProps) => {
  return (
    <div className="d-flex justify-content-center gap-2 w-100">
      <Button type="primary" onClick={handleBack} block ghost>
        Voltar
      </Button>

      {handleContinue ? (
        <Button onClick={handleContinue} type="primary" block>
          Avançar
        </Button>
      ) : (
        <Button htmlType="submit" type="primary" block>
          Avançar
        </Button>
      )}
    </div>
  );
};
