import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import { createTheme, MantineProvider } from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from "./router";
import './index.css'
import './reset.css'
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/ru';
import {DatesProvider} from "@mantine/dates";

const theme = createTheme({
    fontFamily: 'Manrope, sans-serif',
    defaultRadius: 'md',
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} withGlobalClasses>
            <QueryClientProvider client={queryClient}>
                <Notifications />
                <DatesProvider settings={{ locale: 'ru' }}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen />
                </DatesProvider>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
);
