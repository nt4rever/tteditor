import React, { useRef } from "react";
import "./TopBar.css";
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import { FINETUNE_VALUE_CHANGE, IMG_UPLOAD, ZOOM_VALUE_CHANGE } from './../../store/actions';
import { FaFileUpload } from 'react-icons/fa';
import { FaFileDownload } from 'react-icons/fa';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const TopBar = ({ layerEl }) => {
    const fileRef = useRef(null);
    const dispatch = useDispatch()
    const { percent } = useSelector((state) => state.zoom);
    const [open, setOpen] = React.useState(false);
    const [imgName, setImgName] = React.useState(null);

    const handleDownloadClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownload = () => {
        const uri = layerEl.current.toDataURL();
        if (imgName != null) {
            downloadURI(uri, imgName + ".png");
            setOpen(false);
            setImgName(null);
        }
    };

    const handleInputChange = (e) => {
        setImgName(e.target.value);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleChange = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        dispatch({
            type: IMG_UPLOAD,
            url: base64,
            name: e.target.files[0].name
        })
    };

    const handleUploadClick = () => {
        fileRef.current.click();
    }

    return (
        <div className="topbar">
            <div className="button-upload" onClick={handleUploadClick}>
                <FaFileUpload color="#fff" />
                <input
                    ref={fileRef}
                    className="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
            <div className="button-download" onClick={handleDownloadClick}>
                <FaFileDownload color="#fff" />
            </div>
            <div className="percent-box">
                <p className="percent-number">{percent}%</p>
                <Slider
                    size="small"
                    min={0}
                    max={200}
                    defaultValue={100}
                    value={percent}
                    disabled
                    aria-label="Small"
                    sx={{
                        width: '200px',
                        color: '#fff'
                    }}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Nhập tên hình ảnh để tải xuống
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={imgName}
                        margin="dense"
                        id="name"
                        label="Tên hình ảnh"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    .png
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handleDownload}>Tải xuống</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TopBar;
