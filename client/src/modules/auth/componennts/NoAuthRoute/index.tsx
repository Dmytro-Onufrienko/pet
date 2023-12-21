import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

type ReturnType = {
  Component: ComponentType<unknown>;
  componentProps?: { [key: string]: unknown };
}

const NoAuthRoute = ({ componentProps = {}, Component }: ReturnType) => {
  const userQuery = null // useCurrentUser();

  return userQuery ? (
    <Navigate to={'/'} />
  ) : (
    <Component {...componentProps} />
  );
};

export default NoAuthRoute;
