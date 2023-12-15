import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Provider } from 'react-redux';
import store from './redux/store';

import "./index.scss";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Mulish',
            'Nunito',
            'sans-serif',
        ].join(','),
    },
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['vn_WH','en_WH'],
    fallbackLng: "vn_WH",
    lng: 'vn_WH', // default language
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
        // cache user language on
        caches: ['cookie'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {
        useSuspense: false,
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    // </React.StrictMode>
);