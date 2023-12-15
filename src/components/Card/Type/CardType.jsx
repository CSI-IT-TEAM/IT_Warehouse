import { Box, Stack } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import styles from "./CardType.module.scss";

const CardType = ({ title, subtitle, thumb, handleClick, isSelect=false }) => {
    return (
        <>
            <Box className={isSelect ? `${styles['b-card-4']} ${styles['b-card-selected']}`:  `${styles['b-card-4']}`} onClick={handleClick}>
                <Box className={styles['b-icon']}>
                    <TaskAltIcon style={{ fontSize: 35, color: "#4caf50" }} />
                </Box>
                <Box className={styles['b-thumb']}>
                    <img src={thumb} alt={title} />
                </Box>
                <Box className={styles['card-front']}>
                    <Stack>
                        <p className={styles['title']}>{title}</p>
                        <p className={styles['subtitle']}>{subtitle}</p>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default CardType;