import React from "react";
import { BiRectangle, BiStar, BiCircle, BiText, BiPencil, BiEraser } from "react-icons/bi";
import { TOOL_CHANGE } from "../../store/actions.js";
import { useDispatch } from "react-redux";
import ItemFineTune from "./ItemFineTune";
import { useSelector } from "react-redux";

const draws = [
    {
        id: 1,
        tool: "text",
        name: "Text",
        icon: <BiText />,
    },
    {
        id: 2,
        tool: "rectangle",
        name: "Rectangle",
        icon: <BiRectangle />,
    },
    {
        id: 3,
        tool: "cricle",
        name: "Cricle",
        icon: <BiCircle />,
    },
    {
        id: 3,
        tool: "star",
        name: "Star",
        icon: <BiStar />,
    },
    {
        id: 4,
        tool: "pen",
        name: "Pen",
        icon: <BiPencil />,
    }
];

const Draw = () => {
    const dispatch = useDispatch();
    const { tool } = useSelector((state) => state.tool);

    const handleClick = (tool) => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool,
        });
    };

    return (
        <React.Fragment>
            <div className="toolbar-options">
                
            </div>
            <div className="finetune-wrapper">
                {draws.map((item) => (
                    <ItemFineTune
                        key={item.id}
                        tool={item.tool}
                        icon={item.icon}
                        name={item.name}
                        isSelected={tool === item.tool}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Draw;