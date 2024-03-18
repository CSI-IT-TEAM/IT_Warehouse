import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { Box, Container, Grid, Typography,InputAdornment, Stack, TextField, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ResultSkelton, EmptyCard, ButtonPrimary, CameraScan } from '../../components';
import { commonAction } from '../../redux/commonSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, getDate, isNullOrEmpty, submitForm } from '../../functions';
import { getScanDataURL, downloadURL } from '../../api';
import SearchIcon from '@mui/icons-material/Search';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import styles from "./ResultPage.module.scss";
const width = window.innerWidth;
const height = (width <= 479 ? window.innerHeight - 175 : window.innerHeight - 215) + "px";
const ResultCard = lazy(() => import('../../components/Card/Result/ResultCard'));
const EquipResultCard = lazy(() => import('../../components/Card/Result/EquipResultCard'));

const ResultPage = () => {

    ////// Get Data From Homepage
    const location = useLocation();
    const { type, plantCode, locCode, locName, whCode } = location?.state;

    ////// Basic Data
    const [data, setData] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [search, setSearch] = useState("");
    const [place, setPlace] = useState(locName);
    const [filter, setFilter] = useState(null); 
    const [scanType, setScanType] = useState(type);

    ////// Dispatch
    const dispatch = useDispatch();

    ////// Handle Camera
    const [openCamera, setOpenCamera] = useState(false);

    ////// Navigate
    const navigate = useNavigate();

    ////// Translate
    const { t } = useTranslation();
    const skeltonRows = [1,2,3,4];

    ////// Camera Option
    const handleOpenCamera = async () => {
        setOpenCamera(true);
    }

    const handleCloseCamera = () => {
        setOpenCamera(prev => false);
    }

    ////// Scroll To Top
    const scrollToTop = () =>{ 
        window.scrollTo({ 
          top: 0,  
          behavior: 'smooth'
        }); 
    }; 

    const handleScanSuccess = async (decodedText, decodedResult) => {
        if (!isNullOrEmpty(decodedText)) {

            setData(prevData => null);
            setIsEmpty(prevData => false);
            setSearch(prevData => "");
            setFilter(prevData => null); 
            handleCloseCamera();

            await fetchDownload(downloadURL, {
                ARG_TYPE: "Q_SCAN",
                ARG_EMPID: "",
                ARG_WH: whCode,
                ARG_SCAN: decodedText,
                OUT_CURSOR: "" 
            }, "scan-qr");
        }
    }

    ///// Handle Download
    const fetchDownload = async(url, dataConfig, dataType) => {
        let result = null;
        let equipResult = null;
        scrollToTop();

        switch(dataType){
            case "scan-qr":
                result = await fetchData(url, dataConfig);
                dataConfig.ARG_TYPE = "Q_EQUIP_SCAN";
                equipResult = await fetchData(url, dataConfig);

                if(result && result.length > 0){
                    setPlace(prevData => result[0].NAME);
                    navigate(".", {state: {type: "warehouse", plantCode: result[0].PLANT_CD, locCode: result[0].CODE, locName: result[0].NAME, whCode: whCode}});
                }
                else if(equipResult && equipResult.length > 0){
                    setPlace(prevData => equipResult[0].LOC_NM);
                    navigate(".", {state: {type: "equipment", plantCode: equipResult[0].PLANT_CD, locCode: equipResult[0].BARCODE, locName: equipResult[0].LOC_NM, whCode: whCode}});
                }
                else{
                    handleCloseCamera();
                    dispatch(commonAction.setTypeNotice("qr-error"));
                    dispatch(commonAction.openNotice());

                    setData(prevData => null);
                    setFilter(prevData => null);
                    setIsEmpty(prevData => true);
                }

                if(!result && !equipResult){
                    dispatch(commonAction.setTypeNotice("connect-failed"));
                    dispatch(commonAction.openNotice());

                    setData(prevData => null);
                    setFilter(prevData => null);
                    setIsEmpty(prevData => true);
                }

                break;
            case "scan-data":
                setIsEmpty(prevData => false);
                setSearch(prevData => "");
                await submitForm(true);
        
                result = await fetchData(url, dataConfig);
        
                if(result){
                    if(type === "warehouse"){
                        if(result.length > 1){
                            result.shift();
                            setData(prevData => result);
                            setFilter(prevData => result);
                        }else{
                            setData(prevData => null);
                            setFilter(prevData => null);
                            setIsEmpty(prevData => true);
                        }
                    }
                    else if(type === "equipment"){
                        if(result.length > 0){
                            setData(prevData => result);
                            setFilter(prevData => result);
                        }else{
                            setData(prevData => null);
                            setFilter(prevData => null);
                            setIsEmpty(prevData => true);
                        }
                    }
                }else{
                    setData(prevData => null);
                    setFilter(prevData => null);
                    setIsEmpty(prevData => true);
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(location?.state === null || isNullOrEmpty(plantCode) || isNullOrEmpty(locCode) || isNullOrEmpty(locName) || isNullOrEmpty(whCode)){
            navigate("/", {replace: true});
        } 
        else{
            setScanType(scanType => type);
            fetchDownload(getScanDataURL, {
                V_P_SCAN        : type === "warehouse" ? "Q_WH" : "Q_EQUIP",
                V_P_TYPE        : "",
                V_P_PLANT_CD    : plantCode,
                V_P_WH_CD 	    : whCode,
                V_P_PART_GROUP  : "ALL",
                V_P_PART_CD	    : "",
                V_P_YMD			: getDate(),
                V_P_LOC_WH      : locCode,
                V_P_USER 	    : "",
                V_P_IP          : "",
                OUT_CURSOR      : "" 
            }, "scan-data");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);

    ///// Handle Back Home
    const handleClick = () => {
        navigate("/", {replace: true});
    }

    ///// Handle Filter
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(prevData => event.target.value);

        let _input = event.target.value.toUpperCase();
        const filtered = data.filter(item => {
            return item.PART_GROUP.toUpperCase().includes(_input) || item.PART.toUpperCase().includes(_input);
        });

        setFilter(prevData => filtered);
        if(filtered === null || filtered.length === 0){
            setIsEmpty(prevData => true);
        }else{
            setIsEmpty(prevData => false);
        }
    }

    return (
        <>
            <Box className={styles["s-home-5"]}>
                <Box className={styles["s-home-content"]}>
                    <Container>
                        <Box className={styles["s-form-content"]}>
                            <Box sx={{ width: "100%", minHeight: height, }}>
                                {scanType === "warehouse" &&
                                    <>
                                        <Box className={styles["b-card-3"]}>
                                            <Typography className={styles["b-title"]}>{place}</Typography>
                                            <Typography className={styles["b-desc"]}>{t('wh_result_desc')}</Typography>
                                        </Box>
                                        <form>
                                            <Stack marginBottom={3}>
                                                <TextField
                                                    label=""
                                                    inputProps={{ inputMode: 'text', }}
                                                    className={styles["b-input"]}
                                                    placeholder={t('pl_search')}
                                                    value={search}
                                                    onChange={handleFilter}
                                                    name="SEARCH"
                                                    color="info"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                />
                                            </Stack>
                                        </form>
                                        {!isEmpty && 
                                            <Grid container spacing={1.5} className={styles["s-list"]}>
                                                {filter !== null && filter?.length > 0 && filter.map((item, index) => {
                                                    return (
                                                        <Grid key={index} item xs={12} sm={6} className={styles["s-list_item"]}>
                                                            <Suspense fallback={<ResultSkelton />}>
                                                                <ResultCard 
                                                                    order={item.STT}
                                                                    title={item.PART_GROUP}
                                                                    desc={item.PART}
                                                                    status={item.ORDER_PART.toUpperCase()}
                                                                    safeQty={item.SAFETY_INV}
                                                                    stockQty={item.STOCK_QTY}
                                                                    last={index === filter.length - 1} />
                                                            </Suspense>
                                                        </Grid>
                                                    );
                                                })}
                                                {filter == null && skeltonRows.map((item, index) => {
                                                    return (
                                                        <Grid key={index} item xs={12} sm={6}>
                                                            <ResultSkelton />
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        }
                                        {isEmpty &&
                                            <>
                                                <EmptyCard />
                                                <Box className={styles["s-bot"]}>
                                                    <ButtonPrimary title={t('btn_go_hom')} handleClick={handleClick} name="go-back" />
                                                </Box>
                                            </>
                                        }
                                    </>
                                }
                                {scanType === "equipment" &&
                                    <>
                                        <Box className={styles["b-card-3"]}>
                                            <Typography className={styles["b-title"]}>{place}</Typography>
                                            <Typography className={styles["b-desc"]}>{t('equip_result_desc')}</Typography>
                                        </Box>
                                        {data !== null && data?.length > 0 && data.map((item, index) => {
                                            return (
                                                <Suspense key={index} fallback={<ResultSkelton />}>
                                                    <EquipResultCard data={item} />
                                                </Suspense>
                                            );
                                        })}
                                        {data === null && 
                                            <Stack gap={1}>
                                                {skeltonRows.map((item, index) => {
                                                    return (
                                                        <ResultSkelton key={index}/>
                                                    )
                                                })}
                                            </Stack >
                                        }
                                        {isEmpty &&
                                            <>
                                                <EmptyCard />
                                                <Box className={styles["s-bot"]}>
                                                    <ButtonPrimary title={t('btn_go_hom')} handleClick={handleClick} name="go-back" />
                                                </Box>
                                            </>
                                        }
                                    </>
                                }
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <IconButton className={styles["s-fixed"]} onClick={handleOpenCamera} aria-label="scan">
                    <QrCode2Icon sx={{fontSize: 35}} />
                </IconButton>
            </Box>
            {openCamera &&
                <CameraScan open={openCamera} handleSuccess={handleScanSuccess} handleClose={handleCloseCamera} />
            }
        </>
    )
}

export default ResultPage;