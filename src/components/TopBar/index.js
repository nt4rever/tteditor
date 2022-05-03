import React, { useRef } from "react";
import "./TopBar.css";
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import { FINETUNE_VALUE_CHANGE, IMG_UPLOAD, ZOOM_VALUE_CHANGE } from './../../store/actions';

const TopBar = () => {
    const fileRef = useRef(null);
    const dispatch = useDispatch()
    const { percent } = useSelector((state) => state.zoom);

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

    const handleDownloadClick = () => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            brighten: 0,
            blur: 0,
            contrast: 0
        })
    }

    const handleUploadClick = () => {
        fileRef.current.click();
    }

    return (
        <div className="topbar">
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
            <div className="button-upload" onClick={handleUploadClick}>
                <span>Upload</span>
                <input
                    ref={fileRef}
                    className="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
            <div className="button-download" onClick={handleDownloadClick}>
                <span>Download</span>
            </div>
        </div>
    );
};

export default TopBar;
