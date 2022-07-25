import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import Layout from './layout/layout';
import MainPage from './pages/main/main';
import { api } from './__data__/services/api';

// TODO add normalize.css
const App = () => {
    return (
        <ApiProvider api={api}>
            <Layout>
                <h1>Table widget</h1>
                <MainPage />
            </Layout>
        </ApiProvider>
    );
};

export default App;
