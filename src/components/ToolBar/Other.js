import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import API from "../../utils/API.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ToolBar.css";
import Item from "./ItemFilter.js";
import { useDispatch, useSelector } from "react-redux";
import { urlImage } from "../../store/constants.js";
import { IMG_CHANGE, FILTER_CHANGE } from "./../../store/actions";
import { DIALOG_STATUS_CHANGE } from '../../store/actions';
import IconButton from '@mui/material/IconButton';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Grid from '@mui/material/Grid';


const filterItems = [
    {
        id: 1,
        filter: "original",
        name: "Original",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 2,
        filter: "reverse",
        name: "Reverse",
        path: "/point/reverse",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 3,
        filter: "threshold",
        name: "Threshold",
        path: "/point/threshold",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 4,
        filter: "log",
        name: "Log",
        path: "/point/log",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 5,
        filter: "log",
        name: "Log",
        path: "/point/log",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 6,
        filter: "log",
        name: "Log",
        path: "/point/log",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    
];

const segment = ["reverse", "log", "threshold"];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
};

const Other = ({ setIsLoading }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.filter);
    const dialog = useSelector((state) => state.dialog)
    const { imgUrl, imgName } = useSelector((state) => state.img);

    const handleClick = () => {
        dispatch({
            type: DIALOG_STATUS_CHANGE,
            status: true
        });
    }

    useEffect(() => {
        let formData = {
            uri: imgUrl,
            name: imgName,
            a: dialog.a,
            b: dialog.b,
            c: dialog.c,
            x: dialog.x,
            k: dialog.k,
        };

        const fetchData = async () => {
            setIsLoading(true);
            if (filter === "original") {
                dispatch({
                    type: IMG_CHANGE,
                    image: imgUrl,
                });
                setIsLoading(false);
            } else if (segment.includes(filter)) {
                let p = filterItems.find(x => x.filter === filter).path
                await API.post(p, formData).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: IMG_CHANGE,
                            image: urlImage + response.data.filename,
                        });
                        setIsLoading(false);
                    } else return;
                });
            }
            setIsLoading(false);
        };

        fetchData();
    }, [filter]);

    const handleClickFilter = (filter) => {
        dispatch({
            type: FILTER_CHANGE,
            filter: filter,
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div className="config-filter">
                        <IconButton onClick={handleClick} sx={{
                            color: '#fff'
                        }}>
                            <DisplaySettingsIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <Slider {...settings}>
                        {filterItems.map((item) => (
                            <Item
                                key={item.filter}
                                filter={item.filter}
                                img={item.img}
                                name={item.name}
                                isSelected={filter === item.filter}
                                onClick={handleClickFilter}
                            />
                        ))}
                    </Slider>
                </Grid>
            </Grid>
        </>
    );
};

export default Other;
