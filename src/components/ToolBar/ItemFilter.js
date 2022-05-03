import React from "react";
import { useDispatch } from "react-redux";
import "./ToolBar.css";
import { TOOL_CHANGE } from './../../store/actions';

const Item = ({ tool, img, name, isSelected }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool
        })
    }

    return (
        <div className="item" onClick={handleClick} >
            <div aria-selected={isSelected}>
                <img src={img} />
                <label>{name}</label>
            </div>
        </div>
    );
};

export default Item;
