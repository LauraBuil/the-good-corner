// React & React-Router
import { Outlet } from 'react-router';

// Components
import Header from './components/pages/Header.tsx'
import { ToastContainer } from 'react-toastify';

export default function App() {
    return (
        <>
            <Header />
            <ToastContainer />
            <main className="main-content">
                <Outlet />
            </main>
        </>
    );
}
