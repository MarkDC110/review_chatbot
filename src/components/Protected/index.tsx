import { FC, ReactNode, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_AVT } from '../../configs/constants';
import { IUserCtx, UserCtx } from '../../context/UserCtx';

export type ProtectedProps = { children: ReactNode };
const Protected: FC<ProtectedProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  const { setUser } = useContext(UserCtx) as IUserCtx;

  useEffect(() => {
    try {
      const userData = JSON.parse(user!);
      setUser({
        fullname: userData?.fullname!,
        avatar: USER_AVT,
        _id: userData?._id!,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!user) return <Navigate to="/sign-in" />;
  return <>{children}</>;
};

export default Protected;
