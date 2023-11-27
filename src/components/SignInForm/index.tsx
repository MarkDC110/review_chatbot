import { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_UP_ROUTE, USER_AVT } from '../../configs/constants';
import { IUserCtx, UserCtx } from '../../context/UserCtx';
import { hash } from '../../libs/hash';
import userService from '../../services/user.service';
import Input from '../Input';
import './style.css';

export type SignInFormProps = {};

const SignInForm: FC<SignInFormProps> = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const { setUser } = useContext(UserCtx) as IUserCtx;

  const handleOnSubmit = () => {
    if (!username || !password) return alert('Vui lòng nhập đủ thông tin!');
    if (username.length < 6 || password.length < 6)
      return alert('Tên tài khoản và mật khẩu phải lớn hơn 6 kí tự');

    userService
      .login({
        username,
        password: hash(password),
      })
      .then((response) => {
        if (response.success) {
          setUser({
            fullname: response.user?.fullname!,
            avatar: USER_AVT,
            _id: response.user?._id!,
          });
          localStorage.setItem('user', JSON.stringify(response.user));
          navigate('/');
        } else {
          alert(response.message);
        }
      })
      .catch(console.log);
  };

  return (
    <div className="c-sign-in-form">
      <h1>Đăng nhập phiên trò chuyện</h1>
      <div className="sign-in-form__fields">
        <div className="fields__wrapper">
          <Input
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            name="username"
            placeholder="Tên đăng nhập"
            autoComplete="off"
          />
        </div>
        <div className="fields__wrapper">
          <Input
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            name="password"
            type="password"
            placeholder="Mật khẩu"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="sign-in-form__save-pw">
        <label>Lưu phiên trò chuyện</label>
        <input type="checkbox" />
      </div>
      <div className="sign-in-form__actions">
        <Link to={`/${SIGN_UP_ROUTE}`} className="actions__btn register">
          Tạo phiên mới
        </Link>
        <button className="actions__btn login" onClick={handleOnSubmit}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default SignInForm;