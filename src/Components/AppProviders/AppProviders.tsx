import * as React from 'react';

import { AuthProvider } from './Providers/AuthProvider/AuthProvider';

export interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => (
  <AuthProvider>{props.children}</AuthProvider>
);
