import React, {
  createContext,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import {colors, ColorsType} from './colors';

export type User = {
  id: number;
  username: string;
  email: string;
  uuid: string;
  avatar: Object;
};
export type UserData = {
  jwt: string;
  user: User;
};

type AuthContextProps = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  colors: ColorsType;
  userData: UserData | null;
  setUserData: React.Dispatch<SetStateAction<UserData>> | any;
};

const defaultValue: AuthContextProps = {
  isAuth: false,
  setIsAuth: () => {},
  colors: colors,
  userData: null,
  setUserData: (user: User) => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const defaultValue: AuthContextProps = {
    isAuth: isAuth,
    setIsAuth: setIsAuth,
    colors: colors,
    userData: userData,
    setUserData: setUserData,
  };

  return (
    <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>
  );
};
