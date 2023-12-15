import { Box, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import thumb from "../../../assets/images/signal/empty-box.png";

const NoticeCard = () => {

    ////// Translate
    const { t } = useTranslation();

    return (
        <>
            <Box className="s-empty-box">
                <img src={thumb} alt="Empty" />
                <Typography className="s-empty-box__desc">{t('not-found')}</Typography>
            </Box>
        </>
    )
}

export default NoticeCard;