import React from "react";
import { useDispatch } from "react-redux";

const ItemFineTune = ({ icon, name, tool, isSelected, onClick }) => {

    const dispacth = useDispatch();

    const handleClick = () => {
        onClick(tool)
    };

    return (
        <div
            className="finetune-item"
            aria-selected={isSelected}
            onClick={handleClick}
        >
            {icon}
            <label>{name}</label>
        </div>
    );
};

export default ItemFineTune;
