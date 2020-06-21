import React from 'react';
import styled from '@emotion/styled';
import { AuthProvider } from '../context/authContext';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './App/Main';
import Callback from './App/Callback';
import SilentRenew from './App/SilentRenew';
import PrivatePage from './App/PrivatePage';
import { PrivateRoute } from './routes/PrivateRoute';

const routerHistory = createBrowserHistory();

export interface AppProps {

}

const App: React.FC<AppProps> = () => {
    return (
        <AuthProvider>
            <Router history={routerHistory}>
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route path='/callback' component={Callback} />
                    <Route path='/silent' component={SilentRenew} />
                    <Route path='/private' component={() => (
                        <PrivateRoute>
                            <PrivatePage />
                        </PrivateRoute>
                    )} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
