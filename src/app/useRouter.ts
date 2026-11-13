import { createContext, useContext } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

export const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}
