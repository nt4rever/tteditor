import React from "react";
import { useDispatch } from 'react-redux';
import { TAB_CHANGE } from './../../store/actions';

const TabItem = ({ icon, tab, isSelected, name }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({
            type: TAB_CHANGE,
            tab: tab
        })
    }

    return (
        <div
            className="sideBar-item"
            aria-selected={isSelected}
            onClick={handleClick}
        >
            {icon}
            <label>{name}</label>
        </div>
    );
};

export default TabItem;
