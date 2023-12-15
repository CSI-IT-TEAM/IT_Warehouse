import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { FormInput, ButtonPrimary } from '../../components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from '../../redux/commonSlice';
import { validData } from '../../data';
import { isNullOrEmpty, fetchData } from '../../functions';
import { signinURL, updateUserURL } from '../../api';
import { encode as base64_encode } from "base-64";

import styles from "./UserPage.module.scss";

const width = window.innerWidth;
const height = (width <= 479 ? window.innerHeight - 175 : window.innerHeight - 215) + "px";

const LoginPage = () => {

    ////// Basic Data
    const [data, setData] = useState({
        OLD_PASS: "",
        NEW_PASS: "",
        CONFIRM_PASS: "",
    });
    const [validate, setValidate] = useState(validData);
    const lang = useSelector(state => state.common.lang);

    ///// User Data
    const _userData = JSON.parse(sessionStorage.getItem('userDataWH'));

    ////// Translate
    const { t } = useTranslation();
    const dispatch = useDispatch();

    ///////Handle Change Text Field
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _name = event.target.name;
        let _value = event.target.value;

        handleSetValidate(_name, isNullOrEmpty(_value) ? false : true);

        if(_name === "NEW_PASS"){
            if(data.CONFIRM_PASS !== _value){
                handleSetValidate("CONFIRM_PASS",  false, "Confirm data and new password must be the same", "Dữ liệu xác nhận phải giống với mật khẩu mới");
            }else{
                handleSetValidate("CONFIRM_PASS", true, "This field data is required", "Dữ liệu không được rỗng");
            }
        }

        if(_name === "CONFIRM_PASS"){
            if(data.NEW_PASS !== _value){
                handleSetValidate("CONFIRM_PASS",  false, "Confirm data and new password must be the same", "Dữ liệu xác nhận phải giống với mật khẩu mới");
            }else{
                handleSetValidate("CONFIRM_PASS", true, "This field data is required", "Dữ liệu không được rỗng");
            }
        }

        setData(prevData => {
            return{
                ...prevData,
                [_name]: _value
            }
        })
    }

    ///// Handle Confirm
    const handleClick = async() => {
        let _validate = await handleValidate();

        if(_validate){
            let _userCheck = await fetchData(signinURL, {
                ARG_TYPE: "Q_CHECK",
                ARG_EMPID: _userData.EMPID,
                ARG_PASS: base64_encode(data.OLD_PASS),
                ARG_WH: "",
                OUT_CURSOR: "" 
            });

            if(_userCheck && _userCheck.length > 0){
                if(_userCheck[0].RES_YN === "Y"){
                    const result = await fetchData(updateUserURL, {
                        ARG_TYPE: "Q_UPDATE",
                        ARG_EMPID: _userData.EMPID,
                        ARG_PASS: base64_encode(data.NEW_PASS),
                    });

                    if(result){
                        dispatch(commonAction.setTypeNotice("success"));
                        dispatch(commonAction.openNotice());
                        setData(prevData => {
                            return {
                                OLD_PASS: "",
                                NEW_PASS: "",
                                CONFIRM_PASS: "",
                            }
                        })
                    }else{
                        dispatch(commonAction.setTypeNotice("error"));
                        dispatch(commonAction.openNotice());
                    }
                }else{
                    dispatch(commonAction.setTypeNotice("error_pass"));
                    dispatch(commonAction.openNotice());
                }
            }else{
                dispatch(commonAction.setTypeNotice("connect-failed"));
                dispatch(commonAction.openNotice());
            }
        }
    }

    //////// Handle Validate
    const handleSetValidate = (name, value, messageEN = "", messageVN = "") => {
        setValidate(prevData => {
            return {
                ...prevData,
                [name]: {
                    validate: value,
                    messageEN: isNullOrEmpty(messageEN) ? validate[name].messageEN : messageEN,
                    messageVN: isNullOrEmpty(messageVN) ? validate[name].messageVN : messageVN,
                }
            }
        });
    }

    const handleValidate = () => {
        let _result = true;

        if (isNullOrEmpty(data.OLD_PASS)) {
            _result = false;
            handleSetValidate("OLD_PASS", false);
        } else {
            handleSetValidate("OLD_PASS", true);
        }

        if (isNullOrEmpty(data.NEW_PASS)) {
            _result = false;
            handleSetValidate("NEW_PASS", false);
        } else {
            handleSetValidate("NEW_PASS", true);
        }

        if (isNullOrEmpty(data.CONFIRM_PASS)) {
            _result = false;
            handleSetValidate("CONFIRM_PASS", false);
        } else {
            handleSetValidate("CONFIRM_PASS", true);
        }

        if(!isNullOrEmpty(data.NEW_PASS) && !isNullOrEmpty(data.CONFIRM_PASS)){
            if(data.NEW_PASS !== data.CONFIRM_PASS){
                _result = false;
                handleSetValidate("CONFIRM_PASS",  false, "Confirm data and new password must be the same", "Dữ liệu xác nhận phải giống với mật khẩu mới");
            }else{
                handleSetValidate("CONFIRM_PASS", true, "This field data is required", "Dữ liệu không được rỗng");
            }
        }

        return _result;
    }

    return (
        <>
            <Box className={styles['s-home-3']}>
                <Box className={styles['s-home-content']}>
                    <Container>
                        <Box className={styles['s-form-content']}>
                            <Box sx={{ width: "100%", minHeight: height, }}>
                                <Box className={styles['b-card-3']}>
                                    <Typography className={styles['b-title']}>{t('change_title')}</Typography>
                                    <Typography className={styles['b-desc']}>{t('change_desc')}</Typography>
                                </Box>
                                <Box className={styles['s-form']}>
                                    <FormInput
                                        title={t('frm_oldpass')}
                                        placeholder={t('pl_oldpass')}
                                        value={data.OLD_PASS}
                                        isDefault={true}
                                        name="OLD_PASS"
                                        disable={false}
                                        handleEvent={handleChange}
                                        isImportant={true}
                                        inputProp={{ inputMode: 'text',}}
                                        isValidate={validate.OLD_PASS.validate}
                                        message={lang === "en" ? validate.OLD_PASS.messageEN : validate.OLD_PASS.messageVN}
                                        />
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
                                        isValidate={validate.NEW_PASS.validate}
                                        message={lang === "en" ? validate.NEW_PASS.messageEN : validate.NEW_PASS.messageVN}
                                        />
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
                                        isValidate={validate.CONFIRM_PASS.validate}
                                        message={lang === "en" ? validate.CONFIRM_PASS.messageEN : validate.CONFIRM_PASS.messageVN}
                                        />
                                </Box>
                                <Box className={styles['s-bot']}>
                                    <ButtonPrimary title={t('btn_confirm')} handleClick={handleClick} name="pass" />
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default LoginPage;