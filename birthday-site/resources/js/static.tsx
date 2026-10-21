import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from './pages/welcome';
import '../css/app.css';

const appName = 'Penguin Wonderland';

void createInertiaApp({
    id: 'app',
    resolve: () => Welcome,
    setup({ el, App, props }) {
        createRoot(el).render(
            <React.StrictMode>
                <App {...props} />
            </React.StrictMode>
        );
    },
    page: {
        component: 'welcome',
        props: { errors: {} },
        url: window.location.pathname || '/',
        version: '1.0',
        rescuedProps: [],
        flash: {},
        rememberedState: {},
    },
    title: (title) => (title ? `${title} - ${appName}` : appName),
});
