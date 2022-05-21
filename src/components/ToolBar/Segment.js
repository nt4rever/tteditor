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
        filter: "graph-cut",
        name: "Graph Cut",
        path: "/segment/graph-cut",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 3,
        filter: "meanshift",
        name: "Meanshift",
        path: "/segment/meanshift",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 4,
        filter: "kmean",
        name: "Kmean",
        path: "/segment/kmean",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 5,
        filter: "tb-so-hoc",
        name: "TB So Hoc",
        path: "/restoration/tb-so-hoc",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 6,
        filter: "tb-hinh-hoc",
        name: "TB Hinh Hoc",
        path: "/restoration/tb-hinh-hoc",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 7,
        filter: "tb-harmonic",
        name: "Harmonic",
        path: "/restoration/tb-harmonic",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 8,
        filter: "tb-contraharmonic",
        name: "Contraharmonic",
        path: "/restoration/tb-contraharmonic",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 9,
        filter: "loc-trung-vi",
        name: "Loc Trung Vi",
        path: "/restoration/loc-trung-vi",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 10,
        filter: "loc-min",
        name: "Min",
        path: "/restoration/loc-min",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 11,
        filter: "loc-max",
        name: "Max",
        path: "/restoration/loc-max",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 12,
        filter: "loc-midpoint",
        name: "Midpoint",
        path: "/restoration/loc-midpoint",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 13,
        filter: "loc-tuong-thich",
        name: "Loc Tuong Thich",
        path: "/restoration/loc-tuong-thich",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 14,
        filter: "loc-alpha",
        name: "Alpha",
        path: "/restoration/loc-alpha",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
];

const segment = ["graph-cut", "kmean", "meanshift", "tb-so-hoc", "tb-hinh-hoc", "tb-harmonic", "tb-contraharmonic", "loc-trung-vi", "loc-min", "loc-max", "loc-midpoint", "loc-alpha", "loc-tuong-thich"];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
};

const Segment = ({ setIsLoading }) => {
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
                <Grid item xs={1}>
                    <div className="config-filter">
                        <IconButton onClick={handleClick} sx={{
                            color: '#fff'
                        }}>
                            <DisplaySettingsIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={11}>
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

export default Segment;
