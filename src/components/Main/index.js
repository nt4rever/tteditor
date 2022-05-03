import React, { useState } from "react";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import TopBar from "../TopBar/index.js";
import "./index.css";

const Main = () => {

    return (
        <div className="container">
            <TopBar />
            <div className="main">
                <SideBar />
                <Canvas />
            </div>
        </div>
    );
};

export default Main;
