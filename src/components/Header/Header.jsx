import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Menu } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { commonAction } from '../../redux/commonSlice';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { arrayBufferToBase64, formatUserName } from '../../functions';

import "./Header.scss";
import vnImg from "../../assets/images/languages/vn.png";
import engImg from "../../assets/images/languages/en.png";
import userImg from "../../assets/images/avatar.png";

const Header = () => {

    ////// Modal User
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const _isPath = location.pathname.replace('/','') === "scan-result" ? true : false;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    ////// React-Redux
    const dispatch = useDispatch();
    const handleLang = async (value) => {
        await dispatch(commonAction.setLang(value.replace("_WH", "")));
    }

    ///// Set Default language
    const i18_Value = (i18next.language !== null && i18next.language !== undefined && i18next.language !== "") ? i18next.language : "en_WH";
    const [lang, setLang] = useState(i18_Value);
    const handleChange = (event: SelectChangeEvent) => {
        i18next.changeLanguage(event.target.value);
        handleLang(event.target.value);
        setLang(event.target.value);
    };
    const navigate = useNavigate();

    ///// Translate 
    const { t } = useTranslation();

    useEffect(() => {
        handleLang(i18_Value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    ////// Handle Navigate
    const handleNavigate = (path) => {
        switch (path) {
            case "password":
                navigate("/password-change", {replace: _isPath});
                break;
            case "log-out":
                sessionStorage.removeItem('userDataWH');
                navigate("/log-in", {replace: true});
                break;
            default:
                navigate("/", {replace: _isPath});
        }
    }

    ///// User Data
    const _userData = JSON.parse(sessionStorage.getItem('userDataWH'));
    const _avatarImg = (_userData === null) ? userImg : arrayBufferToBase64(_userData.PHOTO.data);
    const _avatarName = (_userData === null) ? "Guest User" : formatUserName(_userData.NAME);

    return (
        <>
            <Box className="s-header">
                <Box className="s-header-text" onClick={() => handleNavigate("")}>
                    <Typography variant="h5" component="div" className="s-header-logo">
                        CSG
                    </Typography>
                    <span>
                        <Typography variant="h1" className="s-header-title s-header-title__top">
                            Spare Part
                        </Typography>
                        <Typography variant="h2" className="s-header-title s-header-title__bot">
                            WH Management
                        </Typography>
                    </span>
                </Box>
                <Box className="s-header-content">
                    <Box className="s-header-lang">
                        <FormControl sx={{ m: 1 }} size="small" variant="standard" className="s-lang__select">
                            <Select
                                value={lang}
                                onChange={handleChange}
                                className="s-lang"
                            >
                                <MenuItem value="en_WH" className="s-lang__item"><span><img src={engImg} alt="English" /></span><span>English</span></MenuItem>
                                <MenuItem value="vn_WH" className="s-lang__item"><span><img src={vnImg} alt="Vietnam" /></span><span>Vietnam</span></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className="s-avatar" onClick={handleClick}>
                        <Avatar
                            alt="avatar"
                            src={_avatarImg}
                            className="s-avatar__thumb"
                        />
                        <span>
                            <Typography className="s-avatar__title">{t('welcome')},</Typography>
                            <Typography className="s-avatar__name">{_avatarName}</Typography>
                        </span>
                    </Box>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.15))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem className="s-user__item" onClick={() => handleNavigate("password")}>
                    <VpnKeyIcon style={{ color: "#00000099", fontSize: 22, }} /> {t('btn_change_pass')}
                </MenuItem>
                <MenuItem className="s-user__item" onClick={() => handleNavigate("log-out")}>
                    <LogoutIcon style={{ color: "#00000099", fontSize: 22, }} /> {t('btn_logout')}
                </MenuItem>
            </Menu>
        </>
    );
}

export default Header;