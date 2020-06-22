import React from 'react';
import styled from '@emotion/styled';

import { BsBoxArrowInRight, BsPeopleCircle } from 'react-icons/bs';

import { useAuthActionContext, useUserContext } from '../../../context/authContext';


const IconContainer = styled.div`
    cursor: pointer;
    margin: 0 8px;

    svg {
        &:hover {
            fill: #121212;
        }
    }
`;

const UserSection: React.FC = () => {
    const { user } = useUserContext();
    const { login, logout } = useAuthActionContext();

    return (
        user
        ? (
            <>
                <div> { user?.email } </div>
                <IconContainer onClick={() => logout()} >
                    <BsBoxArrowInRight size={30} fill='rgb(246, 146, 30)' />
                </IconContainer>
            </>
        )
        : (
            <IconContainer onClick={() => login()} >
                <BsPeopleCircle size={30} fill='rgb(246, 146, 30)' />
            </IconContainer>
        )
    );
}

export { UserSection };
