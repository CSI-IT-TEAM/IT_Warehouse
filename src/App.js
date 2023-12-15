import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from './components';
import { LoginPage, HomePage, ErrorPage, UserPage, ResultPage } from './pages';

import 'devextreme/dist/css/dx.light.css';

const router = createBrowserRouter([
    {
        path: "/log-in",
        errorElement: <ErrorPage />,
        element: (
            <LoginPage />
        ),
    },
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: (
            <Layout>
                <HomePage />
            </Layout>
        ),
    },
    {
        path: "/password-change",
        errorElement: <ErrorPage />,
        element: (
            <Layout>
                <UserPage />
            </Layout>
        ),
    },
    {
        path: "/scan-result",
        errorElement: <ErrorPage />,
        element: (
            <Layout>
                <ResultPage />
            </Layout>
        ),
    },
    {
        path: "*",
        element: (
            <ErrorPage />
        ),
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;