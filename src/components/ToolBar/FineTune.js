import React, { useEffect } from "react";
import {
    SVGBlur,
    SVGBrightness,
    SVGContrast,
    SVGWarmth,
} from "./../../utils/svg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ItemFineTune from "./ItemFineTune.js";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FINETUNE_CHANGE, FINETUNE_VALUE_CHANGE } from "./../../store/actions";

const finetunes = [
    {
        icon: <SVGBrightness />,
        tool: "brighten",
        name: "Brightness",
        min: -1,
        max: 1,
        step: 0.05,
    },
    {
        icon: <SVGContrast />,
        tool: "contrast",
        name: "Contrast",
        min: -100,
        max: 100,
        step: 5,
    },
    {
        icon: <SVGBlur />,
        tool: "blur",
        name: "Blur",
        min: 0,
        max: 100,
        step: 1,
    },
    {
        icon: <SVGWarmth />,
        tool: "warmth",
        name: "Warmth",
        min: 0,
        max: 100,
        step: 1,
    },
];

const FineTune = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const { finetune } = useSelector((state) => state.finetune);
    const { brighten, contrast, blur } = useSelector((state) => state.value);
    const handleChange = (event, newValue) => {
        if (finetune === "blur") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                blur: newValue,
            });
        } else if (finetune === "brighten") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                brighten: newValue,
            });
        } else if (finetune === "contrast") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                contrast: newValue,
            });
        }
    };
    useEffect(() => {
        if (finetune === "blur") {
            setValue(blur);
        } else if (finetune === "brighten") {
            setValue(brighten);
        } else if (finetune === "contrast") {
            setValue(contrast);
        }
    }, [finetune, brighten, contrast, blur]);

    const handleClick = (tool) => {
        dispatch({
            type: FINETUNE_CHANGE,
            finetune: tool,
        });
    };

    return (
        <React.Fragment>
            <div className="toolbar-options">
                {finetunes.map(
                    (item) =>
                        item.tool === finetune && (
                            <Box key={item.tool} sx={{ width: 250 }}>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ mb: 1 }}
                                    alignItems="center"
                                >
                                    <Typography variant="subtitle2" mr={1} sx={{
                                        color: '#fff',
                                    }}>
                                        {item.min}
                                    </Typography>
                                    <Slider
                                        size="small"
                                        value={value}
                                        min={item.min}
                                        max={item.max}
                                        step={item.step}
                                        onChange={handleChange}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        sx={{
                                            color: '#fff',
                                        }}
                                    />
                                    <Typography variant="subtitle2" ml={1} sx={{
                                        color: '#fff',
                                    }}>
                                        {item.max}
                                    </Typography>
                                </Stack>
                            </Box>
                        )
                )}
            </div>
            <div className="finetune-wrapper">
                {finetunes.map((item) => (
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

export default FineTune;
