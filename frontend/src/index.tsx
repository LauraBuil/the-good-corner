// React & React-Router
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

// SCSS
import './assets/scss/index.scss';

// Pages
import App from './App.tsx';

// Children
import RecentAds from './components/pages/RecentAds.tsx';
import About from './components/pages/About.tsx';
import AdDetails from './components/pages/AdDetails.tsx';
import NewAdForm from './components/pages/NewAdForm.tsx';
import FilteredByCategory from './components/pages/FilteredByCategory.tsx';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <RecentAds />,
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/ad/:id',
                element: <AdDetails />
            },
            {
                path: '/ad/new',
                element: <NewAdForm />
            },
            {
                path: '/ads/category/:id',
                element: <FilteredByCategory />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
