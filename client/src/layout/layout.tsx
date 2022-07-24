import React, { FC } from 'react';
import { Footer, Header } from '../components';
import { Content, Wrapper } from './layout.stales';

const Layout: FC = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
