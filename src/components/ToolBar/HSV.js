import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { FINETUNE_VALUE_CHANGE } from "../../store/actions.js";
import { useSelector } from "react-redux";
import './HSV.css'

const HSV = () => {
    const dispatch = useDispatch();
    const { hue, saturation, value } = useSelector((state) => state.value);

    const handleHueChange = (e) => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            hue: e.target.value,
        });
    };
    const handleSaturatioChange = (e) => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            saturation: e.target.value,
        });
    };
    const handleValueChange = (e) => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            value: e.target.value,
        });
    };

    return (
        <React.Fragment>
            <Box sx={{ width: 100, color: "rgb(118, 129, 132)" }} mr={2}>
                <Stack>
                    <Typography variant="caption" id="hue-slider" sx={{
                                            color: '#fff',
                                        }} gutterBottom>
                        Hue
                    </Typography>
                    <Slider
                        aria-labelledby="hue-slider"
                        size="small"
                        aria-label="Small"
                        value={hue}
                        onChange={handleHueChange}
                        sx={{
                            color: '#fff',
                        }}
                        // marks={[
                        //     {
                        //         value: 0,
                        //         label: "0",
                        //     },
                        //     {
                        //         value: 259,
                        //         label: "259",
                        //     },
                        // ]}
                        valueLabelDisplay="auto"
                    />
                </Stack>
            </Box>
            <Box sx={{ width: 100, color: "rgb(118, 129, 132)" }} mr={2}>
                <Stack>
                    <Typography
                        variant="caption"
                        id="saturation-slider"
                        sx={{
                            color: '#fff',
                        }}
                        gutterBottom
                    >
                        Saturation
                    </Typography>
                    <Slider
                        aria-labelledby="saturation-slider"
                        size="small"
                        aria-label="Small"
                        min={-2}
                        max={10}
                        step={0.5}
                        value={saturation}
                        onChange={handleSaturatioChange}
                        sx={{
                            color: '#fff',
                        }}
                        // marks={[
                        //     {
                        //         value: -2,
                        //         label: "-2",
                        //     },
                        //     {
                        //         value: 10,
                        //         label: "10",
                        //     },
                        // ]}
                        valueLabelDisplay="auto"
                    />
                </Stack>
            </Box>
            <Box sx={{ width: 100, color: "rgb(118, 129, 132)" }}>
                <Stack>
                    <Typography
                        variant="caption"
                        id="value-slider"
                        gutterBottom
                        sx={{
                            color: '#fff',
                        }}
                    >
                        Value
                    </Typography>
                    <Slider
                        aria-labelledby="value-slider"
                        size="small"
                        aria-label="Small"
                        min={-2}
                        max={2}
                        step={0.1}
                        value={value}
                        onChange={handleValueChange}
                        sx={{
                            color: '#fff',
                        }}
                        // marks={[
                        //     {
                        //         value: -2,
                        //         label: "-2",
                        //     },
                        //     {
                        //         value: 2,
                        //         label: "2",
                        //     },
                        // ]}
                        valueLabelDisplay="auto"
                    />
                </Stack>
            </Box>
        </React.Fragment>
    );
};

export default HSV;
