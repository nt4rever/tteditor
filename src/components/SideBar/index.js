import React from "react";
import TabItem from "./TabItem.js";
import "./SideBar.css";
import { SVGAdjust, SVGFinetune, SVGFilter, SVGDraw } from "../../utils/svg.js";
import { useSelector } from "react-redux";

const tabs = [
    {
        icon: <SVGAdjust />,
        tab: "adjust",
        name: "Adjust",
    },
    {
        icon: <SVGFinetune />,
        tab: "finetune",
        name: "Finetune",
    },
    {
        icon: <SVGFilter />,
        tab: "filter",
        name: "Filter",
    },
    {
        icon: <SVGDraw />,
        tab: "draw",
        name: "Draws",
    },
];

const SideBar = () => {
    const { tab } = useSelector((state) => state.tab);

    return (
        <div className="sideBar">
            {tabs.map((item) => (
                <TabItem
                    key={item.tab}
                    icon={item.icon}
                    tab={item.tab}
                    name={item.name}
                    isSelected={tab === item.tab}
                />
            ))}
        </div>
    );
};

export default SideBar;
