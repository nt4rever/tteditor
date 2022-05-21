import React from "react";
import "./ToolBar.css";

const Item = ({ filter, img, name, isSelected, onClick }) => {
    
    const handleClick = () => {
        onClick(filter)
    }

    return (
        <div className="item" onClick={handleClick} >
            <div aria-selected={isSelected}>
                <img src={img} alt=""/>
                <label>{name}</label>
            </div>
        </div>
    );
};

export default Item;
