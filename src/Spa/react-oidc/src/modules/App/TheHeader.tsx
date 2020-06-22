import React from 'react';
import styled from '@emotion/styled';

import { UserSection } from './TheHeader/UserSection';
import { MenuHeader } from './TheHeader/MenuHeader';

const Header = styled.header`
    align-items: center;
    background: #fff;
    border-bottom: solid 2px;
    display: flex;
    flex-direction: row;
    font-family: Montserrat;
    height: 80px;
    padding: 0 24px;

    button {
        margin-right: 8px;
    }
`;

const TheHeader: React.FC = () => {
    return (
        <Header>
            <MenuHeader />
            <UserSection />
        </Header>
    );
}

export { TheHeader };
