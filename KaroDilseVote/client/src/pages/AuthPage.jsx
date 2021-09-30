import React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      <ErrorMessage />
      <Auth authType={authType} />
    </div>
  );
};

export default AuthPage;
