import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;