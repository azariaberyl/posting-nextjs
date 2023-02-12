import { createContext } from 'react';

interface Loading {
  loadingComponent: boolean;
  loading: boolean;
}

const LoadingContext = createContext<Loading>({ loading: true, loadingComponent: true });

export const LoadingProvider = LoadingContext.Provider;

export default LoadingContext;
