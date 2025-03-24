// React & React-Router-DOM
import { Outlet } from 'react-router-dom';

// Components
import Header from './components/pages/Header.tsx'

export default function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}