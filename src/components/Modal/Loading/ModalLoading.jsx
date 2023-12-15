import { Box } from '@mui/material';

import "./ModalLoading.scss";

const ModalLoading = ({ open }) => {
    return(
        <>
            <Box className={open ? "s-modal-load s-modal-load--active" : "s-modal-load"}>
                <Box className="s-modal-load__logo"></Box>
            </Box>
        </>
    );
}

export default ModalLoading;