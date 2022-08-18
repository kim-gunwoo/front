import React from 'react';
import { Route, Routes } from 'react-router-dom';

const IndexPage = React.lazy(() => import('./pages/index.page'));

interface CustomRouterPropsInterface {
    baseUrl: string;
}

function CustomRouter({ baseUrl }: CustomRouterPropsInterface) {
    return (
        <React.Suspense fallback={<></>}>
            <Routes>
                <Route path={`${baseUrl}`} element={<IndexPage />} />
            </Routes>
        </React.Suspense>
    );
}

export default React.memo(CustomRouter);
