import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { DIALOG_VALUE_CHANGE, DIALOG_STATUS_CHANGE } from '../../store/actions';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function FilterDialog() {
    const { open, a, b, c, x, k } = useSelector((state) => state.dialog)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({
            type: DIALOG_STATUS_CHANGE,
            status: false
        });
    };

    const handleChange_t = (event, newValue) => {
        dispatch({
            type: DIALOG_VALUE_CHANGE,
            a: newValue[0],
            b: newValue[1],
            c: c,
            x: x,
            k: k,
        })
    };

    const handleChange_c = (event, newValue) => {
        dispatch({
            type: DIALOG_VALUE_CHANGE,
            a: a,
            b: b,
            c: newValue,
            x: x,
            k: k,
        })
    };

    const handleChange_x = (event, newValue) => {
        dispatch({
            type: DIALOG_VALUE_CHANGE,
            a: a,
            b: b,
            c: c,
            x: newValue,
            k: k,
        })
    };

    const handleChange_k = (event, newValue) => {
        dispatch({
            type: DIALOG_VALUE_CHANGE,
            a: a,
            b: b,
            c: c,
            x: x,
            k: newValue,
        })
    };

    function valuetext(value) {
        return `${value}`;
    }

    const marks_c = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    const marks_k = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 5,
            label: '5',
        },
    ];

    const marks_x = [
        {
            value: 3,
            label: '3',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 9,
            label: '9',
        },
    ];

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Filter Config</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} direction="row" sx={{ height: '100px', width: '500px' }} alignItems="center">
                        <p>c</p>
                        <Slider
                            aria-label="c"
                            defaultValue={2}
                            getAriaValueText={valuetext}
                            step={0.1}
                            valueLabelDisplay="auto"
                            marks={marks_c}
                            min={0}
                            max={10}
                            value={c}
                            onChange={handleChange_c}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ height: '80px', width: '500px' }} alignItems="center">
                        <p>k</p>
                        <Slider
                            aria-label="x"
                            defaultValue={3}
                            getAriaValueText={valuetext}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks_k}
                            min={1}
                            max={5}
                            value={k}
                            onChange={handleChange_k}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ height: '80px', width: '500px' }} alignItems="center">
                        <p>x</p>
                        <Slider
                            aria-label="x"
                            defaultValue={3}
                            getAriaValueText={valuetext}
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks_x}
                            min={3}
                            max={9}
                            value={x}
                            onChange={handleChange_x}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ height: '80px', width: '500px' }} alignItems="center">
                        <p>t</p>
                        <Slider
                            getAriaLabel={() => 'Threshold range'}
                            value={[a, b]}
                            onChange={handleChange_t}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={255}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
