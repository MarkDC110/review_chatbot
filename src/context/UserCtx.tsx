import { createContext, FC, ReactNode, useState } from 'react';
import { USER_AVT } from '../configs/constants';

export type UserData = {
  _id: string;
  fullname: string;
  avatar?: string;
};

export interface IUserCtx {
  user: UserData | null;
  setUser: (data: UserData) => void;
}

const user = JSON.parse(localStorage.getItem('user') as any);

export const UserCtx = createContext<IUserCtx | null>(null);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>({
    fullname: user?.fullname,
    avatar: USER_AVT,
    _id: user?._id,
  });

  const setUser = (data: UserData) => {
    setUserData(data);
  };

  return (
    <UserCtx.Provider
      value={{
        user: userData,
        setUser,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
