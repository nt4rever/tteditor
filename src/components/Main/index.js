import React, { useState } from "react";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import TopBar from "../TopBar/index.js";
import "./index.css";

const Main = () => {
    const layerEl = React.createRef();
    const imageRef = React.useRef();
    return (
        <div className="container">
            <TopBar layerEl={layerEl} />
            <div className="main">
                <Canvas imageRef={imageRef} layerEl={layerEl} />
                <SideBar />
            </div>
        </div>
    );
};

export default Main;
