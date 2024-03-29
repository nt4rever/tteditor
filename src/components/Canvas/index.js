import React, { useEffect, useRef, useState } from "react";
import Filters from "../ToolBar/Filters.js";
import Segment from "../ToolBar/Segment.js";
import "./Canvas.css";
import Konvas from "./Konva.js";
import Loading from "./../Loading/index";
import FineTune from "../ToolBar/FineTune.js";
import { useSelector } from "react-redux";
import Adjust from "./../ToolBar/Adjust";
import Other from "../ToolBar/Other.js";
import Draw from "../ToolBar/Draw.js";

const Canvas = ({ imageRef, layerEl }) => {
    const canvasRef = useRef();
    const [canvas, setCanvas] = useState({ height: 0, width: 0 });

    const [isLoading, setIsLoading] = useState(false);

    const { tab } = useSelector((state) => state.tab);

    useEffect(() => {
        setCanvas({
            height: canvasRef.current.clientHeight,
            width: canvasRef.current.clientWidth,
        });
    }, []);

    return (
        <div className="editor-content">
            <div ref={canvasRef} className="canvas-container">
                {isLoading && <Loading />}
                <Konvas
                    imageRef={imageRef}
                    layerEl={layerEl}
                    height={canvas.height}
                    width={canvas.width}
                />
            </div>
            <div className="tool-bar">
                {tab === "filter" && <Filters setIsLoading={setIsLoading} />}
                {tab === "finetune" && <FineTune />}
                {tab === "adjust" && <Adjust />}
                {tab === "segment" && <Segment setIsLoading={setIsLoading} />}
                {tab === "other" && <Other setIsLoading={setIsLoading} />}
                {tab === "draw" && <Draw />}
            </div>
        </div>
    );
};

export default Canvas;
