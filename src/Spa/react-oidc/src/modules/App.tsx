import React from 'react';
import { AuthProvider } from '../context/authContext';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './App/Main';
import Callback from './App/Callback';
import SilentRenew from './App/SilentRenew';
import PublicPage from './App/PublicPage';
import PrivatePage from './App/PrivatePage';
import { PrivateRoute } from './routes/PrivateRoute';
import { GlobalStyles } from '../styles/GlobalStyles';
import { TheHeader } from './App/TheHeader';

const routerHistory = createBrowserHistory();

export interface AppProps {

}

const App: React.FC<AppProps> = () => {
    return (
        <>
            <GlobalStyles />
            <AuthProvider>
                <Router history={routerHistory}>
                    <TheHeader />
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route path='/callback' component={Callback} />
                        <Route path='/silent' component={SilentRenew} />
                        <Route path='/public' component={PublicPage} />
                        <Route path='/private' component={() => (
                            <PrivateRoute>
                                <PrivatePage />
                            </PrivateRoute>
                        )} />
                    </Switch>
                </Router>
            </AuthProvider>
        </>
    );
}

export default App;
