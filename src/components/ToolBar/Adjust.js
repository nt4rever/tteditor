import React from "react";
import { MdRotateLeft } from "react-icons/md";
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg";
import ItemFineTune from "./ItemFineTune";
import {
    FINETUNE_CHANGE,
    FLIPX_CHANGE,
    FLIPY_CHANGE,
} from "./../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const adjusts = [
    {
        id: 1,
        tool: "rotate",
        name: "Rotate",
        icon: <MdRotateLeft />,
    },
    {
        id: 1,
        tool: "flipx",
        name: "Flip X",
        icon: <CgEditFlipH />,
    },
    {
        id: 1,
        tool: "flipy",
        name: "Flip Y",
        icon: <CgEditFlipV />,
    },
];

const Adjust = () => {
    const dispatch = useDispatch();
    const { finetune } = useSelector((state) => state.finetune);
    const { flipx, flipy } = useSelector((state) => state.flip);

    const handleClick = (tool) => {
        dispatch({
            type: FINETUNE_CHANGE,
            finetune: tool,
        });
        if (tool === "flipx") {
            dispatch({
                type: FLIPX_CHANGE,
            });
        }
        if (tool === "flipy") {
            dispatch({
                type: FLIPY_CHANGE,
            });
        }
    };
    return (
        <React.Fragment>
            <div className="toolbar-options"></div>
            <div className="finetune-wrapper">
                {adjusts.map((item) => (
                    <ItemFineTune
                        key={item.tool}
                        tool={item.tool}
                        icon={item.icon}
                        name={item.name}
                        isSelected={finetune === item.tool}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Adjust;
