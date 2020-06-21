import React from 'react';
import styled from '@emotion/styled';
import { useUserContext, useAuthActionContext } from '../../context/authContext';

const Header = styled.header`
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LoginButton = styled.button`
    margin-left: auto;
`;

const MainContainer = styled.main`
    height: 100%;
`;

const PrivatePage: React.FC = () => {
    const { login, logout } = useAuthActionContext();
    const userContext = useUserContext();

    return (
        <>
            <Header>
                <div>Header</div>
                <div> Email: {userContext?.user?.email} </div>
                <LoginButton onClick={() => login()}>Login</LoginButton>
                <LoginButton onClick={() => logout()}>Log out</LoginButton>
            </Header>
            <MainContainer>Private Page</MainContainer>
        </>
    );
}
 
export default PrivatePage;
