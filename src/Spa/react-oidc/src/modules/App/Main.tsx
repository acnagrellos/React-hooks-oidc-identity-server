import React from 'react';
import styled from '@emotion/styled';
import { AuthProvider, useAuthActionContext, useUserContext } from '../../context/authContext';
import { authConfiguration } from '../../services/auth/auth-config';
import { AuthServiceFactory } from '../../services/auth/authService';

// const authService = AuthServiceFactory(authConfiguration, true);

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

export interface MainProps {
    
}
 
const Main: React.FC<MainProps> = () => {
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
            <MainContainer>Main Container</MainContainer>
        </>
    );
}
 
export default Main;
