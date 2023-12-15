import { Box } from '@mui/material';
import Html5QrcodePlugin from "../CameraPlugin/Html5QrcodePlugin";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./CameraScan.scss";

const CameraScan = ({ open, handleSuccess, handleClose }) => {
    return (
        <>
            <Box className="s-camera">
                <Box className="s-camera-content">
                    <Box className="s-camera-icon" onClick={handleClose}>
                        <CloseRoundedIcon sx={{fontSize: 30}} />
                    </Box>
                    <Html5QrcodePlugin
                        key={"camera"}
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={handleSuccess}
                    />
                </Box>
            </Box>
        </>
    )
}

export default CameraScan;