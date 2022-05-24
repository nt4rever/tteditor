import React, { useEffect } from "react";
import {
    SVGBlur,
    SVGBrightness,
    SVGContrast,
    SVGHSV,
    SVGWarmth,
} from "./../../utils/svg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ItemFineTune from "./ItemFineTune.js";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TOOL_CHANGE, FINETUNE_VALUE_CHANGE } from "./../../store/actions";
import HSV from "./HSV.js";

const finetunes = [
    {
        icon: <SVGBrightness />,
        tool: "brighten",
        name: "Brightness",
        min: -0.5,
        max: 0.5,
        step: 0.01,
    },
    {
        icon: <SVGContrast />,
        tool: "contrast",
        name: "Contrast",
        min: -50,
        max: 50,
        step: 1,
    },
    {
        icon: <SVGHSV />,
        tool: "hsv",
        name: "HSB",
    },
    {
        icon: <SVGBlur />,
        tool: "blur",
        name: "Blur",
        min: 0,
        max: 10,
        step: 1,
    },
    // {
    //     icon: <SVGWarmth />,
    //     tool: "warmth",
    //     name: "Warmth",
    //     min: 0,
    //     max: 100,
    //     step: 1,
    // },
];

const FineTune = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const { tool } = useSelector((state) => state.tool);
    const { brighten, contrast, blur } = useSelector((state) => state.value);
    const handleChange = (event, newValue) => {
        if (tool === "blur") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                blur: newValue,
            });
        } else if (tool === "brighten") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                brighten: newValue,
            });
        } else if (tool === "contrast") {
            dispatch({
                type: FINETUNE_VALUE_CHANGE,
                contrast: newValue,
            });
        }
    };
    useEffect(() => {
        if (tool === "blur") {
            setValue(blur);
        } else if (tool === "brighten") {
            setValue(brighten);
        } else if (tool === "contrast") {
            setValue(contrast);
        }
    }, [tool, brighten, contrast, blur]);

    const handleClick = (tool) => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool,
        });
    };

    return (
        <React.Fragment>
            <div className="toolbar-options">
                {finetunes.map(
                    (item) =>
                        item.tool === tool &&
                        item.tool !== "hsv" && (
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
                {tool === "hsv" && <HSV />}
            </div>
            <div className="finetune-wrapper">
                {finetunes.map((item) => (
                    <ItemFineTune
                        key={item.tool}
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

export default FineTune;
