import React, { useEffect } from 'react';
import { useAuthActionContext } from '../../context/authContext';

const SilentRenew: React.FC = () => {
    const { completeSilentRenewToken } = useAuthActionContext();
    
    useEffect(() => {
        console.log('silent-renew');
        completeSilentRenewToken();
    }, [completeSilentRenewToken]);
    return null;
};

export default SilentRenew;
