import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import { createTheme, MantineProvider } from '@mantine/core';
import router from "./router";
import './index.css'
import './reset.css'
import '@mantine/core/styles.css';

const theme = createTheme({
    fontFamily: 'Manrope, sans-serif',
    defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);