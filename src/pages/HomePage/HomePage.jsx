import { useState } from 'react';
import { Suspense, lazy } from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { ButtonPrimary, CameraScan } from '../../components';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commonAction } from '../../redux/commonSlice';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { isNullOrEmpty, fetchData } from '../../functions';
import { downloadURL } from '../../api';

import warehouseImg from "../../assets/images/thumbs/warehouse.png"
import equipImg from "../../assets/images/thumbs/equipment.png";

import styles from "./HomePage.module.scss";
const width = window.innerWidth;
const height = (width <= 479 ? window.innerHeight - 175 : window.innerHeight - 215) + "px";

const CardType = lazy(() => import('../../components/Card/Type/CardType'));

const HomePage = () => {

    ////// Initial Data
    const [type, setType] = useState("warehouse");

    ///// User Data
    const lastLogin = localStorage.getItem("lastLoginWH") === null ? null : JSON.parse(localStorage.getItem("lastLoginWH"));

    ////// Handle Camera
    const [openCamera, setOpenCamera] = useState(false);

    ////// Navigate
    const navigate = useNavigate();

    ////// Translate
    const { t } = useTranslation();

    ////// Dispatch
    const dispatch = useDispatch();

    //////Camera Option
    const handleOpenCamera = async () => {
        //navigate("/scan-result", {state: {plantCode: "2110", locCode: "2110_10_A0001", locName: "Section 1", whCode: "10"}});
        setOpenCamera(true);
    }

    const handleCloseCamera = () => {
        setOpenCamera(prev => false);
    }

    const handleScanSuccess = async (decodedText, decodedResult) => {
        if (!isNullOrEmpty(decodedText)) {
            await fetchDownload(downloadURL, {
                ARG_TYPE: "Q_SCAN",
                ARG_EMPID: "",
                ARG_WH: lastLogin.WH_CD,
                ARG_SCAN: decodedText,
                OUT_CURSOR: "" 
            }, "scan_qr");
        }
    }

    /////// Validate Barcode
    const fetchDownload = async (url, dataConfig, type) => {
        const result = await fetchData(url, dataConfig);

        if(result){
            if (result?.length > 0) {
                navigate("/scan-result", {state: {plantCode: result[0].PLANT_CD, locCode: result[0].CODE, locName: result[0].NAME, whCode: lastLogin.WH_CD}});
            } else {
                handleCloseCamera();
                dispatch(commonAction.setTypeNotice("qr-error"));
                dispatch(commonAction.openNotice());
            }
        }
        else{
            dispatch(commonAction.setTypeNotice("connect-failed"));
            dispatch(commonAction.openNotice());
        }
    }

    ////// Service under contruct
    const handleContruct = () => {
        dispatch(commonAction.setTypeNotice("under-construct"));
        dispatch(commonAction.openNotice());
    }

    return (
        <>
            <Box className={styles['s-home-2']}>
                <Box className={styles['s-home-content']}>
                    <Container>
                        <Box className={styles['s-form-content']}>
                            <Box sx={{ width: "100%", minHeight: height, }}>
                                <Box className={styles['b-card-3']}>
                                    <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                                        <Box sx={{ textAlign: "center", position: "relative", transform: "rotate(45deg)" }}>
                                            <QrCode2Icon style={{ fontSize: 35 }} />
                                            <Box className={styles['b-qr-border']}></Box>
                                        </Box>
                                        <Typography className={styles['b-title']}>{t('notify_title')}</Typography>
                                    </Stack>
                                    <Typography className={styles['b-desc']}>{t('notify_desc')}</Typography>
                                </Box>
                                <Grid container spacing={1.5}>
                                    <Grid item xs={6}>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <CardType title="Warehouse" subtitle="Management" thumb={warehouseImg} isSelect={type === "warehouse"} handleClick={() => {}} />
                                        </Suspense>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <CardType title="Equipments" subtitle="Management" thumb={equipImg} isSelect={type === "equipment"} handleClick={handleContruct} />
                                        </Suspense>
                                    </Grid>
                                </Grid>
                                <Box className={styles['s-bot']}>
                                    <ButtonPrimary title={t('btn_scan')} handleClick={handleOpenCamera} name="scan" />
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
            {openCamera &&
                <CameraScan open={openCamera} handleSuccess={handleScanSuccess} handleClose={handleCloseCamera} />
            }
        </>
    );
}

export default HomePage;