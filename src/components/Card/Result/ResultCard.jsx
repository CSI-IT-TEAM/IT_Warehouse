import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import styles from "./ResultCard.module.scss";

const ResultCard = ({ order, title, desc, status, safeQty, stockQty, last }) => {

    ////// Translate
    const { t } = useTranslation();

    return (
        <>
            <Box className={last ? `${styles["b-card-5"]} ${styles["b-border--none"]}` : `${styles["b-card-5"]}`}>
                <Stack direction="row" gap={1}>
                    <Box className={styles["b-num"]}>{order}</Box>
                    <Box sx={{width: "100%"}}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Box className={styles["b-title"]}>{title}</Box>
                            {status === "OK" &&
                                <Box className={`${styles['b-status']} ${styles['b-status--green']}`}>
                                    <DoneAllIcon sx={{ fontSize: 20 }} /> OK
                                </Box>
                            }
                            {status === "SAFETY" &&
                                <Box className={`${styles['b-status']} ${styles['b-status--yellow']}`}>
                                    <HourglassBottomIcon sx={{ fontSize: 20 }} /> Safety
                                </Box>
                            }
                            {status === "ORDER" &&
                                <Box className={`${styles['b-status']} ${styles['b-status--red']}`}>
                                    <LocalShippingIcon sx={{ fontSize: 20 }} /> Order
                                </Box>
                            }
                        </Stack>
                        <Box className={styles["b-desc"]}>{desc}</Box>
                        <Stack direction="column" gap={0.5}>
                            <div className={styles["item"]}>
                                <CheckIcon className={styles["b-icon"]} />
                                <span className={styles["regular-text"]}>{t('safety')}:</span>
                                <span className={styles["big-text"]}>{safeQty}</span>
                            </div>
                            <div className={styles["item"]}>
                                <CheckIcon className={styles["b-icon"]} />
                                <span className={styles["regular-text"]}>{t('in_stock')}:</span>
                                <span className={styles["big-text"]}>{stockQty}</span>
                            </div>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default ResultCard;