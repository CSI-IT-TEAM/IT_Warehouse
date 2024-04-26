import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ButtonPrimary, SelectItem } from "../../components";
import { ModalNotice, ModalRegister, ModalLoading } from "../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { commonAction } from '../../redux/commonSlice';
import { encode as base64_encode } from "base-64";

import styles from "./LoginPage.module.scss";
import loginImage from "../../assets/images/thumbs/banner.png";
import { fetchData } from "../../functions";
import { signinURL, downloadURL, userURL } from "../../api";

const height = window.innerHeight + "px";

const LoginPage = () => {

    ///// Basic Data
    const lastLogin = localStorage.getItem("lastLoginWH") === null ? null : JSON.parse(localStorage.getItem("lastLoginWH"));
    const [data, setData] = useState({
        PLANT_CD: lastLogin ? lastLogin.PLANT_CD : "",
        WH_CD: lastLogin ? lastLogin.WH_CD : "",
        EMP_ID: lastLogin ? lastLogin.EMP_ID : "",
        PASS: "",
    });
    const [whData, setWhData] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [open, setOpen] = useState(false);
    const [openLoad, setOpenLoad] = useState(false);

    ////// Translate
    const { t } = useTranslation();

    ///// Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();

    ////// Open Modal
    const openNotice = useSelector(state => state.common.openNotice);
    const typeNotice = useSelector(state => state.common.typeNotice);

    ////// Handle Modal Notice
    const handleCloseNotice = () => {
        dispatch(commonAction.closeNotice());
    }

    ////// Handle Events
    const handleClick = () => {
        setShowPass(showPass => !showPass);
    }

    const handleCloseReg = () => {
        setOpen(open => !open);
    }

    //////// Handle Set Controlled Data
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            }
        })
    };

    ////// Handle Login
    const handleSignIn = async() => {
        fetchDownload(signinURL, {
            ARG_TYPE: "Q",
            ARG_EMPID: data.EMP_ID,
            ARG_PASS: (data.PASS === data.EMP_ID) ? data.PASS : base64_encode(data.PASS),
            ARG_WH: data.WH_CD,
            OUT_CURSOR: "" 
        }, "login");
    }

    const fetchDownload = async (url, dataConfig, type) => {
        const result = await fetchData(url, dataConfig);

        if(result){
            if(result.length > 0){
                switch(type){
                    case "warehouse":
                        setWhData(prevData => result);
                        ///// Deault Warehouse: IT
                        setData(prevData => {
                            return {
                                ...prevData,
                                PLANT_CD: '2110',
                                WH_CD: '10',
                            }
                        });
                        break;
                    case "login":
                        handleLoginCases(result[0].NAME);
                        break;
                    case "user":
                        sessionStorage.setItem("userDataWH", JSON.stringify(result[0]));
                        localStorage.setItem("lastLoginWH", JSON.stringify({
                            PLANT_CD: data.PLANT_CD,
                            EMP_ID: result[0].EMPID,
                            WH_CD: data.WH_CD,
                        }));
                        navigate("/");
                        break;
                    default:
                        break;
                }
            }else{
                switch(type){
                    case "warehouse":
                        setWhData(prevData => null);
                        break;
                    default:
                        break;
                }
            }
        }else{
            dispatch(commonAction.setTypeNotice("connect-failed"));
            dispatch(commonAction.openNotice());
        }
    }

    ///// Login Cases
    const handleLoginCases = (type) => {
        switch(type){
            case "INVALID_USER":
                dispatch(commonAction.setTypeNotice("invalid_user"));
                dispatch(commonAction.openNotice());
                break;
            case "INVALID_WH":
                dispatch(commonAction.setTypeNotice("invalid_warehouse"));
                dispatch(commonAction.openNotice());
                break;
            case "INVALID_PASSWORD":
                dispatch(commonAction.setTypeNotice("invalid_pass"));
                dispatch(commonAction.openNotice());
                break;
            case "CHANGE_PASSWORD":
                setOpen(open => true);
                break;
            case "LOGIN_SUCCESS":
                handleNavigate();
                break;
            default: 
                break;
        }
    }

    const handleNavigate = async() => {
        setOpen(open => false);
        setOpenLoad(openLoad => true);
        await submitForm(true);
        setOpenLoad(openLoad => false);

        fetchDownload(userURL, {
            V_P_TYPE: "ESMS_LOGIN",
            V_P_EMPID: data.EMP_ID,
            V_P_PASSWORD: "",
            OUT_CURSOR: "",
        }, "user");
    }

    function submitForm(result) {
        // Pretend it's hitting the network.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (result) {
                    resolve();
                } else {
                    reject();
                }
            }, 2000);
        });
    }

    ////// Default Events
    useEffect(() => {
        fetchDownload(downloadURL, {
            ARG_TYPE: "Q_WH_V2",
            ARG_EMPID: "",
            ARG_WH: "",
            ARG_SCAN: "",
            OUT_CURSOR: "" 
        }, "warehouse");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    ////// Handle Select
    const handleSelect = (name, value) => {
        const splitArr = value.split('_');

        if(splitArr.length === 2){
            setData(prevData => {
                return {
                    ...prevData,
                    PLANT_CD: splitArr[0],
                    WH_CD: splitArr[1],
                }
            });
        }
    }

    ////// Redirect for trust source
    const handleRedirect = () => {
        window.location.replace('https://172.30.10.120');
    }

    return (
        <>
            <Box
                className={styles["s-layout"]}
                sx={{
                    width: "100%",
                    minHeight: height,
                }}
            >
                <Box className={styles["b-box"]}>
                    <Box className={styles["s-form"]}>
                        <Box className={styles["p-title"]}>
                            Spare Part <span>WH Management</span>
                        </Box>
                        <Box className={styles["b-thumb"]} onClick={handleRedirect}>
                            <img src={loginImage} alt="Login" />
                        </Box>
                        <form>
                            <Stack marginBottom={1.5}>
                                <SelectItem
                                    title={t('warehouse')}
                                    name="WH_CD"
                                    data={whData}
                                    placeholder="Chọn kho hàng"
                                    cValue={data.PLANT_CD + '_' + data.WH_CD}
                                    handleEvent={handleSelect}
                                    isValidate={true}
                                    message="Dữ liệu không được để trống" />
                            </Stack>
                            <Stack marginBottom={1.5}>
                                <TextField
                                    label="User ID"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    className={styles["b-input"]}
                                    placeholder="Nhập mã thẻ"
                                    value={data.EMP_ID}
                                    onChange={handleChange}
                                    name="EMP_ID"
                                    color="info"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </Stack>
                            <Stack marginBottom={1.5}>
                                <TextField
                                    label="Password"
                                    type={showPass ? "text" : "password"}
                                    inputProps={{ inputMode: 'text', }}
                                    className={styles["b-input"]}
                                    placeholder="Nhập mật khẩu"
                                    value={data.PASS}
                                    onChange={handleChange}
                                    name="PASS"
                                    color="info"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ paddingLeft: 1.5, }} onClick={handleClick} >
                                                {showPass ? <VisibilityOffIcon />: <VisibilityIcon /> }
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                                <Typography className={styles["s-validate"]}>Password and ID is same for first time login</Typography>
                            </Stack>
                            <Box className={styles["s-bot"]}>
                                <ButtonPrimary title={t('login')} handleClick={handleSignIn} name="key" />
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <ModalNotice 
                open={openNotice} 
                handleClose={handleCloseNotice}
                type={typeNotice} />
            <ModalRegister 
                open={open}
                handleClose={handleCloseReg}
                baseData={data.EMP_ID}
                handleNavigate={handleNavigate}
            />
            <ModalLoading open={openLoad} />
        </>
    );
};

export default LoginPage;