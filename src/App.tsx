import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthenticatedAppWrapper } from './Components/AuthenticatedAppWrapper/AuthenticatedAppWrapper';
import { UnauthenticatedApp } from './Components/UnauthenticatedApp/UnauthenticatedApp';

import './App.css';

export const App = (): JSX.Element => {
  return (
    <div className="app__content">
      <Switch>
        <Route path="/personal" component={AuthenticatedAppWrapper} />
        <Route exact={true} component={UnauthenticatedApp} />
      </Switch>
    </div>
  );
};
