/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { isEqual } from 'lodash';
import { FunctionComponent, useEffect } from 'react';
import { Provider } from 'react-redux';
import { initializeAuth } from './ocAuth';
import logout from './ocAuth/logout';
import { OcConfig, setConfig } from './ocConfig';
import { retrieveOrder } from './ocCurrentOrder';
import ocStore, { useOcDispatch, useOcSelector } from './ocStore';
import { getUser } from './ocUser';
import { useRouter } from 'next/router';
import authAnonymous from './ocAuth/authAnonymous';

interface OcProviderProps {
  config: OcConfig;
  children: any;
}

const OcInitializer: FunctionComponent<OcProviderProps> = ({ children, config }) => {
  const dispatch = useOcDispatch();
  const isPreviewing = config.isPreviewing;
  const { ocConfig, ocAuth, ocUser, ocCurrentOrder } = useOcSelector((s) => ({
    ocConfig: s.ocConfig,
    ocAuth: s.ocAuth,
    ocUser: s.ocUser,
    ocCurrentOrder: s.ocCurrentOrder,
  }));
  const router = useRouter();

  useEffect(() => {
    console.log(`isPreviewing: ${isPreviewing}`);
    if (!ocConfig.value || !isEqual(ocConfig.value, config)) {
      dispatch(setConfig(config));
    } else if (!ocAuth.initialized) {
      dispatch(initializeAuth());
    } else if (!ocAuth.isAuthenticated && ocUser.user) {
      dispatch(logout());
    } else if (!ocAuth.isAuthenticated) {
      dispatch(authAnonymous());
    } else if (ocAuth.isAuthenticated) {
      if (!ocUser.user && !ocUser.loading) {
        dispatch(getUser());
      }
      if (!ocCurrentOrder.initialized) {
        dispatch(retrieveOrder());
      }
    }
  }, [dispatch, config, ocConfig, ocAuth, ocUser, ocCurrentOrder, isPreviewing, router]);

  return <>{children}</>;
};

const OcProvider: FunctionComponent<OcProviderProps> = ({ children, config }) => {
  return (
    <Provider store={ocStore}>
      <OcInitializer config={config}>{children}</OcInitializer>
    </Provider>
  );
};

export default OcProvider;
