import React from "react";
import TabItem from "./TabItem.js";
import "./SideBar.css";
import { SVGAdjust, SVGFinetune, SVGFilter, SVGDraw } from "../../utils/svg.js";
import { useSelector, useDispatch } from "react-redux";
import { FINETUNE_VALUE_CHANGE } from "./../../store/actions";
import RefreshIcon from '@mui/icons-material/Refresh';

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
    const dispatch = useDispatch();

    const handleResetClick = () => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            brighten: 0,
            contrast: 0,
            blur: 0,
            hue: 0,
            saturation: 0,
            value: 0,
            rotate: 0
        });
    }
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
            <div className="reset-wrapper">
                <div className="reset" onClick={handleResetClick}>
                    <RefreshIcon/>
                </div>
            </div>

        </div>
    );
};

export default SideBar;
