import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ButtonRound from '../../Button/Round/ButtonRound';
import { isNullOrEmpty } from '../../../functions';
import { infoData } from '../../../data';

const ModalNotice = ({ open, handleClose, type }) => {

    ////// React-Redux
    const lang = useSelector(state => state.common.lang);
    let data = null;
    let _showButton = true;

    switch(type){
        case 'success': 
            data = infoData[0];
            break;
        case 'error': 
            data = infoData[1];
            break;
        case 'not-found': 
            data = infoData[2];
            break;
        case 'connect-failed': 
            data = infoData[3];
            break;
        case 'upload-img-failed': 
            data = infoData[4];
            break;
        case 'qr-error': 
            data = infoData[5];
            break;
        case 'under-construct': 
            data = infoData[6];
            _showButton = false;
            break;
        case 'invalid_user': 
            data = infoData[7];
            break;
        case 'invalid_pass': 
            data = infoData[8];
            break;
        case 'invalid_warehouse': 
            data = infoData[9];
            break;
        case 'error_pass': 
            data = infoData[10];
            break;
        default:
            break;
    }

    if(isNullOrEmpty(data)) return;

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="s-modal">
                    <Box className="s-modal__thumb s-mt">
                        <img src={data.thumb} alt={data.type} />
                    </Box>
                    <Typography id="modal-modal-title" variant="h5" className="s-modal__title">
                        {lang === "en" ? data.title_EN : data.title_VN}
                    </Typography>
                    <Typography id="modal-modal-desc" variant="h6" component="h2" className="s-modal__desc">
                        {lang === "en" ? data.desc_EN : data.desc_VN}
                    </Typography>
                    {_showButton &&
                        <Box className="s-modal__bot s-modal__bot--center">
                            <ButtonRound title="OK" bgColor="#4caf50" handleClick={handleClose} />
                        </Box>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default ModalNotice;