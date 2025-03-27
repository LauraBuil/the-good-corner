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
import AddNewCategoryAndTags from './components/pages/AddNewCategoryAndTags.tsx';

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
                path: '/ads/:id',
                element: <AdDetails />
            },
            {
                path: '/ad/new',
                element: <NewAdForm />
            },
            {
                path: '/ads/category/:id',
                element: <RecentAds />
            },
            {
                path: '/newcategories',
                element: <AddNewCategoryAndTags />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
