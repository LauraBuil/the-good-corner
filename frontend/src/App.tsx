// React & React-Router
import { Outlet } from 'react-router';

// Components
import Header from './components/pages/Header.tsx'

export default function App() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
        </>
    );
}
