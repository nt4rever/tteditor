import React, { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { ZOOM_VALUE_CHANGE } from "../../store/actions";
import Circ from "./../tools/Circle";
import { addTextNode } from "./../tools/textNode";
import { v1 as uuidv1 } from "uuid";
import Rectangle from "./../tools/Rectangle";
import { addLine } from "./../tools/line";
import Stars from "../tools/Star.js";

const Konvas = ({ imageRef, layerEl, height, width }) => {
    const stageEl = React.createRef();
    const [circles, setCircles] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [stars, setStars] = useState([])
    const [shapes, setShapes] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [, updateState] = React.useState();
    const [isDraw, setIsDraw] = useState(false);
    const dispatch = useDispatch();
    const { image: img } = useSelector((state) => state.img);
    const [image, setImage] = useState()
    const { brighten, contrast, blur, hue, saturation, value, rotate } =
        useSelector((state) => state.value);
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
    const { tool } = useSelector((state) => state.tool);
    const { tab } = useSelector((state) => state.tab);

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
        if (image) {
            imageRef.current.cache();
        }
    }, [image, brighten, contrast, blur]);

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const addCircle = (x, y) => {
        const circ = {
            x: x,
            y: y,
            width: 100,
            height: 100,
            fill: "red",
            id: `circ${circles.length + 1}`,
        };
        const circs = circles.concat([circ]);
        setCircles(circs);
        const shs = shapes.concat([`circ${circles.length + 1}`]);
        setShapes(shs);
    };

    const addRectangle = (x, y) => {
        const rect = {
            x: x,
            y: y,
            width: 100,
            height: 100,
            fill: "red",
            id: `rect${rectangles.length + 1}`,
        };
        const rects = rectangles.concat([rect]);
        setRectangles(rects);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };

    const addStar = (x, y) => {
        const s = {
            x: x,
            y: y,
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 40,
            width: 100,
            height: 100,
            fill: "red",
            id: `star${stars.length + 1}`,
        };
        const star = stars.concat([s]);
        setStars(star);
        const shs = shapes.concat([`star${stars.length + 1}`]);
        setShapes(shs);
    };

    const drawLine = () => {
        addLine(stageEl.current.getStage(), layerEl.current);
    };

    const drawText = () => {
        const id = addTextNode(stageEl.current.getStage(), layerEl.current);
        const shs = shapes.concat([id]);
        setShapes(shs);
    };

    const handleLayerClick = (e) => {
        const stage = e.target.getStage();
        if (!isDraw) return;
        if (tool === "cricle") {
            addCircle(
                stage.getPointerPosition().x,
                stage.getPointerPosition().y
            );
        }
        if (tool === "rectangle") {
            addRectangle(
                stage.getPointerPosition().x,
                stage.getPointerPosition().y
            );
        }
        if (tool === "star") {
            addStar(
                stage.getPointerPosition().x,
                stage.getPointerPosition().y
            );
        }
        if (tool === "text") {
            drawText();
        }
        if (tool === "pen") {
            drawLine();
        }
    };

    document.addEventListener("keydown", (ev) => {
        if (ev.code === "Delete") {
            let index = circles.findIndex((c) => c.id === selectedId);
            if (index !== -1) {
                circles.splice(index, 1);
                setCircles(circles);
            }
            index = rectangles.findIndex((r) => r.id === selectedId);
            if (index !== -1) {
                rectangles.splice(index, 1);
                setRectangles(rectangles);
            }
            index = stars.findIndex((r) => r.id === selectedId);
            if (index !== -1) {
                stars.splice(index, 1);
                setStars(stars);
            }
            forceUpdate();
        }
    });

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
            ref={stageEl}
            width={width}
            height={height}
            x={coordinates.x}
            y={coordinates.y}
            scaleX={scale}
            scaleY={scale}
            onWheel={handleWheel}
            onMouseDown={(e) => {
                const clickedOnEmpty = e.target === e.target.getStage();
                setIsDraw(false);
                if (clickedOnEmpty) {
                    selectShape(null);
                    setIsDraw(true);
                }
            }}
            onClick={handleLayerClick}
        >
            <Layer ref={layerEl}>
                <Image
                    draggable={tab === 'draw' ? false : true}
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
                    rotation={rotate}
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
                {circles.map((circle, i) => {
                    return (
                        <Circ
                            key={i}
                            shapeProps={circle}
                            isSelected={circle.id === selectedId}
                            onSelect={() => {
                                selectShape(circle.id);
                            }}
                            onChange={(newAttrs) => {
                                const circs = circles.slice();
                                circs[i] = newAttrs;
                                setCircles(circs);
                            }}
                        />
                    );
                })}
                {rectangles.map((rect, i) => {
                    return (
                        <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                    );
                })}
                {stars.map((star, i) => {
                    return (
                        <Stars
                            key={i}
                            shapeProps={star}
                            isSelected={star.id === selectedId}
                            onSelect={() => {
                                selectShape(star.id);
                            }}
                            onChange={(newAttrs) => {
                                const star = stars.slice();
                                star[i] = newAttrs;
                                setStars(star);
                            }}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default Konvas;
