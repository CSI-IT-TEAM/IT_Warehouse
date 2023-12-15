import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openNotice: false,
    typeNotice: "success",
    openLoad: false,
    lang: "vn",
    scanStatus: false,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openNotice: (state) => {
            state.openNotice = true;
        },
        closeNotice: (state) => {
            state.openNotice = false;
        },
        openLoad: (state) => {
            state.openLoad = true;
        },
        closeLoad: (state) => {
            state.openLoad = false;
        },
        setTypeNotice: (state, action) => {
            state.typeNotice = action.payload;
        },
        setLang: (state, action) => {
            state.lang = action.payload;
        },
        setScanStatus: (state, action) => {
            state.scanStatus = action.payload;
        },
    }
});

export const commonAction = commonSlice.actions;
export default commonSlice;