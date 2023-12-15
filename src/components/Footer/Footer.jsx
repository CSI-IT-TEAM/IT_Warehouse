import { Box, Typography } from '@mui/material';

import "./Footer.scss";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <Box className="s-footer">
                <Typography variant="h5" component="div" className="s-footer-title">© {year} - Application is made with 🥰 by VJ IT Team</Typography>
            </Box>
        </>
    )
}

export default Footer;