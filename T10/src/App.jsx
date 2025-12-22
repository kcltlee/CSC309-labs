import './App.css';
import { useState } from 'react';
import { CitiesProvider } from './contexts/CitiesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App = () => {
    const [page, setPage] = useState("home");
    let component;

    if (page === "home") {
        component = <Home setPage={setPage} />;
    }
    else if (typeof(page) === "number") {
        component = <Detail cityId={page} setPage={setPage} />;
    }
    else {
        component = <NotFound />;
    }

    return <CitiesProvider>
        <BrowserRouter>
            <Routes>
                {/* Parent route renders Layout and children render into <Outlet /> */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home setPage={setPage} />} />
                    <Route path="/:cityId" element={<Detail setPage={setPage} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </CitiesProvider>;
};

export default App;