import React, { useEffect } from 'react';
import { useAuthActionContext, useUserContext } from '../../context/authContext';

const PrivateRoute: React.FC = ({ children }) => {
    const { login } = useAuthActionContext();
    const { user } = useUserContext();

    useEffect(() => {
        if (!user) {
            login();
        }
    }, [login, user]);

    if (!user) {
        return <div>Cargando...</div>;
    } else {
        return <>{ children }</>;
    }
};

export { PrivateRoute };
