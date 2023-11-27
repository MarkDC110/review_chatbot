import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../configs/constants';
import { IUserCtx, UserCtx } from '../../context/UserCtx';

import './style.css';

export type UserInfoProps = {};

const UserInfo: FC<UserInfoProps> = () => {
  const { user } = useContext(UserCtx) as IUserCtx;

  if (!user) return null;
  return (
    <div className="c-user-info">
      <div className="c-user-info__container">
        <img
          className="c-user-info__avatar"
          src={user.avatar}
          alt={user.fullname}
        />
        <span className="c-user-info__name">{user.fullname}</span>
        <div className="c-user-info__actions">
          <Link to={`/${SIGN_IN_ROUTE}`}>Kết Thúc Phiên</Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
