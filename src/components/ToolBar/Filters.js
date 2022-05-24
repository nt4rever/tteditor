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
        img: "/assets/filter/original.png",
    },
    {
        id: 2,
        filter: "blur",
        path: "/filter/gaussian-blur",
        name: "Blur",
        img: "/assets/filter/blur.png",
    },
    {
        id: 3,
        filter: "hist",
        path: "/point/hist",
        name: "Histogram",
        img: "/assets/filter/histogram.png",
    },
    {
        id: 4,
        filter: "laplacian",
        path: "/filter/laplacian",
        name: "Laplacian",
        img: "/assets/filter/laplacian.png",
    },
    {
        id: 5,
        filter: "sobel",
        path: "/filter/sobel",
        name: "Sobel",
        img: "/assets/filter/sobelx.png",
    },
    {
        id: 7,
        filter: "HDR",
        path: "/special/HDR",
        name: "HDR",
        img: "/assets/filter/hdr.png",
    },
    {
        id: 8,
        filter: "summer",
        path: "/special/summer",
        name: "Summer",
        img: "/assets/filter/summer.png",
    },
    {
        id: 9,
        filter: "winter",
        path: "/special/winter",
        name: "Winter",
        img: "/assets/filter/blur.png",
    },
    {
        id: 10,
        filter: "sharpen",
        path: "/special/sharpen",
        name: "Sharpen",
        img: "/assets/filter/sharpen.png",
    },
    {
        id: 11,
        filter: "sepia",
        path: "/special/sepia",
        name: "Sepia",
        img: "/assets/filter/sepia.png",
    },
    {
        id: 11,
        filter: "pencil_sketch_grey",
        path: "/special/pencil-sketch-grey",
        name: "Pencil sketch grey",
        img: "/assets/filter/pencil.png",
    },
];

const filters = ["hist", "blur", "laplacian", "sobel", "HDR", "summer", "winter", "sharpen", "sepia", "pencil_sketch_grey"]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
};

const ToolBar = ({ setIsLoading }) => {
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
            } else if (filters.includes(filter)) {
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
            <Grid container spacing={3}>
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

export default ToolBar;
