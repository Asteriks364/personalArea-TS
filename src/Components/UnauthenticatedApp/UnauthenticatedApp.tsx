import * as React from 'react';

import { LoginForm } from '../LoginForm/LoginForm';

import './UnauthenticatedApp.css';

export const UnauthenticatedApp = (): JSX.Element => {
  return (
    <div className="unauthenticated-app">
      <div className="unauthenticated-app__header">Войти в личный кабинет</div>
      <div className="unauthenticated-app__login-form">
        <LoginForm />
      </div>
    </div>
  );
};
