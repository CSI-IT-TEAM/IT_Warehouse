import { Box, Stack, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isNullOrEmpty } from '../../../functions';

import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

import styles from "./ResultCard.module.scss";

const EquipResultCard = ({ data }) => {

    ////// Translate
    const { t } = useTranslation();

    return (
        <>
            <Box className={`${styles["b-card-5"]}`}>
                <Stack direction="row" gap={1}>
                    <Box className={styles["b-num"]}>1</Box>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Box className={styles["b-title"]}>{data.GRP_PART_NM}</Box>
                            <Box className={`${styles['b-status']} ${styles['b-status--yellow']}`}>
                                <LocationOnIcon sx={{ fontSize: 20 }} /> {data.LOC_NM}
                            </Box>
                        </Stack>
                        <Box className={styles["b-desc"]}></Box>
                        <Stack direction="column" gap={0.5}>
                            <div className={styles["item"]}>
                                <CheckIcon className={styles["b-icon"]} />
                                <span className={styles["regular-text"]}>Barcode:</span>
                                <span className={`${styles['big-text']} ${styles['medium-text']}`}>{data.BARCODE}</span>
                            </div>
                            <div className={styles["item"]}>
                                <CheckIcon className={styles["b-icon"]} />
                                <span className={styles["regular-text"]}>Serial:</span>
                                <span className={`${styles['big-text']} ${styles['medium-text']}`}>{data.SERIAL_NO}</span>
                            </div>
                            {!isNullOrEmpty(data.PREVIOUS_USER) &&
                                <div className={styles["item"]}>
                                    <CheckIcon className={styles["b-icon"]} />
                                    <span className={styles["regular-text"]}>{t('prev_user')}:</span>
                                    <span className={`${styles['big-text']} ${styles['medium-text']}`}>{data.PREVIOUS_USER}</span>
                                </div>
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Grid sx={{ marginTop: "5px" }} container spacing={1}>
                <Grid item xs={6}>
                    <Stack flexDirection="row" alignItems="center" gap={1} className={styles["b-card-6"]}>
                        <Box className={styles["b-num"]}><MoveToInboxIcon /></Box>
                        <Stack gap={0.2}>
                            <Box className={styles["b-title"]}>{t('incoming')}</Box>
                            <Box className={styles["b-desc"]}>{data.IC_YMD}</Box>
                        </Stack>
                    </Stack>
                </Grid>
                {!isNullOrEmpty(data.WARRANTY_DATE) &&
                    <Grid item xs={6}>
                        <Stack flexDirection="row" alignItems="center" gap={1} className={`${styles["b-card-6"]}`}>
                            <Box className={styles["b-num"]}><VerifiedUserIcon /></Box>
                            <Stack gap={0.2}>
                                <Box className={styles["b-title"]}>{t('waranty')}</Box>
                                <Box className={styles["b-desc"]}>{data.WARRANTY_DATE}</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                }
                {!isNullOrEmpty(data.REPAIR_DATE) &&
                    <Grid item xs={6}>
                        <Stack flexDirection="row" alignItems="center" gap={1} className={`${styles["b-card-6"]}`}>
                            <Box className={styles["b-num"]}><ConstructionIcon /></Box>
                            <Stack gap={0.2}>
                                <Box className={styles["b-title"]}>{t('repair')}</Box>
                                <Box className={styles["b-desc"]}>{data.REPAIR_DATE}</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                }
                {!isNullOrEmpty(data.ABROGATION_DATE) &&
                    <Grid item xs={6}>
                        <Stack flexDirection="row" alignItems="center" gap={1} className={`${styles["b-card-6"]}`}>
                            <Box className={styles["b-num"]}><GppMaybeIcon /></Box>
                            <Stack gap={0.2}>
                                <Box className={styles["b-title"]}>{t('abrogation')}</Box>
                                <Box className={styles["b-desc"]}>{data.ABROGATION_DATE}</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                }
                {!isNullOrEmpty(data.OG_YMD) &&
                    <Grid item xs={12}>
                        <Stack flexDirection="row" alignItems="center" gap={1} className={`${styles["b-card-6"]}`}>
                            <Box className={styles["b-num"]}><LocalShippingIcon /></Box>
                            <Stack gap={0.2}>
                                <Box className={styles["b-title"]}>{t('last_outgoing')}</Box>
                                <Box className={styles["b-desc"]}>{data.OG_YMD}</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default EquipResultCard;