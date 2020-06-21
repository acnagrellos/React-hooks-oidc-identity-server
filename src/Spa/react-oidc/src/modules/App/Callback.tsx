import React, { useEffect } from 'react';
import { useAuthActionContext } from '../../context/authContext';
import { useHistory } from 'react-router-dom';

export interface CallbackProps {
    
}
 
const Callback: React.FC<CallbackProps> = () => {
    const auth = useAuthActionContext();
    const history = useHistory();

    useEffect(() => {
        const redirectLogin = async () => {
            try {
                await auth.authCallback();
                history.push('/');
            } catch (ex) {
                console.log(ex);
                history.push('/');
            }
        };

        redirectLogin();
    }, [auth, history]);

    return ( 
        <div>loading...</div>
    );
}
 
export default Callback;
