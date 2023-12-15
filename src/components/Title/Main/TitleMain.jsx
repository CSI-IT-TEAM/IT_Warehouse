import { Typography } from "@mui/material";

import "./TitleMain.scss";

const TitleMain = ({ order, title }) => {
    return (
        <>
            <Typography variant="h5" className="s-title-2">
                <span>{order}</span>{title}
            </Typography>
        </>
    );
}

export default TitleMain;