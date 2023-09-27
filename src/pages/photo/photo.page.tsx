import { Button, Layout, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { ContentContainer, PageHeader } from "../../components";
import { usePhoto } from "../../hooks/photo";

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
        : `${1.33 * (0.75 * window.innerHeight)}px`;

    const height = isPortrait
        ? `${window.innerWidth}px`
        : `100%`;

    const photoStyle = { width, height, rotate: isPortrait ? "90deg" : "0deg" };
    return (
        <Layout>
            <PageHeader />

            <Content>
                <ContentContainer>
                    <div className="d-flex gap-3 justify-content-center pb-3">
                        <Button type="primary" ghost>
                            Minha estufa
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center h-100">
                        {isLoading ? (
                            <Skeleton.Image active style={photoStyle} />
                        ) : (
                            photo && <img alt="img" src={photo} style={photoStyle} />
                        )}
                    </div>
                </ContentContainer>
            </Content>
        </Layout>
    );
};
