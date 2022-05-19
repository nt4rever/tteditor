import React, { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { ZOOM_VALUE_CHANGE } from "../../store/actions";

const Konvas = ({ height, width }) => {
    const dispatch = useDispatch();
    const { imgUrl, imgName, image: img } = useSelector((state) => state.img);
    const [image, setImage] = useState()
    const imageRef = React.useRef();
    const { brighten, contrast, blur, hue, saturation, value } = useSelector((state) => state.value);
    const { flipx, flipy } = useSelector((state) => state.flip);
    const [coordinates, setCoordinates] = useState({
        x: width / 2,
        y: height / 2,
    });
    const [imageAttr, setImageAttr] = useState({
        width: 0,
        height: 0,
    });
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const imgLoad = new window.Image();
        imgLoad.src = img;
        imgLoad.crossOrigin = "anonymous";
        imgLoad.onload = () => {
            setImage(imgLoad);
            var scale1 = Math.min(width / imgLoad?.width, height / imgLoad?.height);
            setImageAttr({
                width: imgLoad?.width * scale1,
                height: imgLoad?.height * scale1,
            });
        };
    }, [img, width, height]);

    useEffect(() => {
        var scale1 = Math.min(width / image?.width, height / image?.height);
        setImageAttr({
            width: image?.width * scale1,
            height: image?.height * scale1,
        });
    }, [image]);

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
        }
    }, [image, brighten, contrast, blur]);

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale =
            e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setScale(newScale);
        dispatch({
            type: ZOOM_VALUE_CHANGE,
            percent: Math.round(newScale * 100)
        });
        setCoordinates({
            x:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                newScale,
            y:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                newScale,
        });
    };

    return (
        <Stage
            width={width}
            height={height}
            x={coordinates.x}
            y={coordinates.y}
            scaleX={scale}
            scaleY={scale}
            onWheel={handleWheel}
        >
            <Layer>
            <Image
                    draggable
                    ref={imageRef}
                    scaleY={flipx ? -1 : 1}
                    scaleX={flipy ? -1 : 1}
                    x={width / 2}
                    y={height / 2}
                    width={imageAttr.width}
                    height={imageAttr.height}
                    offsetX={imageAttr.width / 2}
                    offsetY={imageAttr.height / 2}
                    image={image}
                    filters={[
                        Konva.Filters.Brighten,
                        Konva.Filters.Contrast,
                        Konva.Filters.Blur,
                        Konva.Filters.HSV
                    ]}
                    blurRadius={blur}
                    brightness={brighten}
                    contrast={contrast}
                    hue={hue}
                    saturation={saturation}
                    value={value}
                />
            </Layer>
        </Stage>
    );
};

export default Konvas;
