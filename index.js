import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import * as backend from './build/index.main.mjs';

import AuthProvider from './providers/auth';
import Connector from './connector';
import Faucet from './faucet';
import MaintenanceMode from './components/maintenance';
import ErrorBoundary from './components/ErrorBoundary';
// import UnderDevelopment from './client/src/components/underDevleopment';

import './styles/main.css';

const reach = loadStdlib('ALGO');
reach.setSignStrategy('AlgoSigner');

const withErrorBoundary = Component => props => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);

const NotFound = () => (
  <div className="text-center mt-12">
    <h1 className="text-lg">Page not found</h1>
  </div>
);

ReactDOM.render(
  <Router>
    <Switch>
      {process.env.REACT_APP_MAINTENANCE_MODE ? (
        <Route path="*" component={MaintenanceMode} />
      ) : (
        <AuthProvider>
          {/* switch required for not found to work */}
          <Switch>
            <Route exact path="/" render={withErrorBoundary(Connector)} />
            <Route exact path="/faucet" render={withErrorBoundary(Faucet)} />
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      )}
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();