import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import FormInput from '../../Form/Input/FormInput';
import { useTranslation } from 'react-i18next';
import { fetchData, isNullOrEmpty } from '../../../functions';
import { updateUserURL } from '../../../api';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { encode as base64_encode } from "base-64";

import ButtonRound from '../../Button/Round/ButtonRound';
import thumb from "../../../assets/images/signal/options.png";

const ModalRegister = ({ open, handleClose, baseData, handleNavigate }) => {

    ////// Translate
    const { t } = useTranslation();

    ////// Basic Data
    const [data, setData] = useState({
        "NEW_PASS": "",
        "CONFIRM_PASS": "",
    });
    const [valid, setValid] = useState(false);

    ///////Handle Change Text Field
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(valid){
            setValid(false);
        }
        setData(prevData => {
            return{
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    ////// Handle Change Default Password
    const handleReg = async() => {
        let _validate = await handleValidate();

        if(_validate){
            const result = await fetchData(updateUserURL, {
                ARG_TYPE: "Q_UPDATE",
                ARG_EMPID: baseData,
                ARG_PASS: base64_encode(data.NEW_PASS),
            });

            if(result){
                handleNavigate();
            }
        }
    }

    ///// Validate Data
    const handleValidate = () => {
        let _result = true;

        if(isNullOrEmpty(data.NEW_PASS)){
            _result = false;
            return _result;
        }

        if(isNullOrEmpty(data.CONFIRM_PASS)){
            _result = false;
            return _result;
        }

        if(data.NEW_PASS !== data.CONFIRM_PASS){
            setValid(true);
            _result = false;
            return _result;
        }

        return _result;
    }

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
                        <img src={thumb} alt="Register" />
                    </Box>
                    <Typography id="modal-modal-title" variant="h5" className="s-modal__title">
                        {t('change_title')}
                    </Typography>
                    <Typography id="modal-modal-desc" variant="h6" component="h2" className="s-modal__desc s-modal__desc--sec">
                        {t('change_desc')}
                    </Typography>
                    <form>
                        <Box sx={{marginBottom: 1, marginTop: 2}}>
                            <FormInput
                                title={t('frm_newpass')}
                                placeholder={t('pl_newpass')}
                                value={data.NEW_PASS}
                                isDefault={true}
                                name="NEW_PASS"
                                disable={false}
                                handleEvent={handleChange}
                                isImportant={true}
                                inputProp={{ inputMode: 'text',}}
                                isValidate={(!isNullOrEmpty(data.NEW_PASS))}
                                message={t('validate_data')}
                                />
                            {valid && 
                                <Typography className='b-validate'><HighlightOffIcon sx={{width: '17px', height: '17px'}} />{t('validate_equal')}</Typography>
                            }
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <FormInput
                                title={t('frm_confirmpass')}
                                placeholder={t('pl_confirmpass')}
                                value={data.CONFIRM_PASS}
                                isDefault={true}
                                name="CONFIRM_PASS"
                                disable={false}
                                handleEvent={handleChange}
                                isImportant={true}
                                inputProp={{ inputMode: 'text',}}
                                isValidate={!isNullOrEmpty(data.CONFIRM_PASS)}
                                message={t('validate_data')}
                                />
                            {valid && 
                                <Typography className='b-validate'><HighlightOffIcon sx={{width: '17px', height: '17px'}} />{t('validate_equal')}</Typography>
                            }
                        </Box>
                    </form>
                    <Box className="s-modal__bot s-modal__bot--center">
                        <ButtonRound title="OK" bgColor="#4caf50" handleClick={handleReg} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalRegister;