import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Skeleton, Typography } from "antd";
import { ActionsBar, ContentCard } from "components";

export const LoadingProfileCard = () => {
  return (
    <ContentCard>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            type="text"
            disabled
          />

          <Skeleton.Input size="small" active />

          <Button icon={<EyeOutlined />} shape="circle" type="text" disabled />
        </div>

        <div className="d-flex align-items-center justify-content-between w-100">
          <Typography.Title level={5} className="m-0">
            Duração
          </Typography.Title>
          <Skeleton.Input size="small" active />
        </div>

        <div className="pt-3">
          <ActionsBar
            buttons={[
              {
                text: "Editar perfil",
                handleClick: () => {},
                disabled: true,
              },
              {
                text: "Perfil selecionado",
                handleClick: () => {},
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </ContentCard>
  );
};
