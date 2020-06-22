import React from 'react';
import styled from '@emotion/styled';

import { routesConfig } from '../../routes/routes-config';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

const Logo = styled.img`
    height: 60px;
    margin-right: 32px;
`;

const Menu = styled.ul`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-right: auto;

`;

const MenuItem = styled.li`
    font-size: 18px;
    padding: 0 8px;

    a {
        color: #121212;
        text-decoration: none;

        &:hover, 
        &.active {
            color: rgb(246, 146, 30);
        }
    }

    &:after {
        content: '|';
        margin-left: 8px;
    }
`;

const MenuHeader: React.FC = () => {
    return ( 
        <Menu>
            <li>
                <NavLink to='/'>
                    <Logo src={logo} alt='logo' />
                </NavLink>
            </li>
            {
                routesConfig.map(route => (
                    <MenuItem key={route.text}>
                        <NavLink exact to={route.url} activeClassName='active'>{route.text}</NavLink>
                    </MenuItem>
                ))
            }
        </Menu>
    );
}
 
export { MenuHeader };
