import React from 'react';
import Layout from './layout/layout';
import MainPage from './pages/main/main';

// TODO add normalize.css
const App = () => {
    return (
        <Layout>
            <h1>Table widget</h1>
            <MainPage />
        </Layout>
    );
};

export default App;
