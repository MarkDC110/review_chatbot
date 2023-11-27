import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../configs/constants';
import { hash } from '../../libs/hash';
import userService from '../../services/user.service';
import Input from '../Input';
import './style.css';

export type SignUpFormProps = {};

const SignUpForm: FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [fullname, setFullname] = useState<string>();
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    if (!username || !password || !fullname || !confirmPassword)
      return alert('Vui lòng nhập đủ thông tin!');

    if (username.length < 6 || password.length < 6)
      return alert('Tên tài khoản và mật khẩu phải lớn hơn 6 kí tự');
    if (confirmPassword !== password) return alert('Mật khẩu không khớp!');

    userService
      .register({
        username,
        fullname,
        password: hash(password),
      })
      .then((response) => {
        if (response.success) {
          alert('Đăng ký thành công!');
          navigate('/sign-in');
        } else {
          alert(response.message);
        }
      })
      .catch(console.log);
  };

  return (
    <div className="c-sign-up-form">
      <h1>Đăng ký phiên trò chuyện</h1>
      <div className="sign-up-form__fields">
        <div className="fields__wrapper">
          <Input
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            placeholder="Tên đăng nhập"
            name="username"
          />
        </div>
        <div className="fields__wrapper">
          <Input
            onChange={(e) => setFullname((e.target as HTMLInputElement).value)}
            placeholder="Họ tên"
            name="fullname"
          />
        </div>
        <div className="fields__wrapper">
          <Input
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            placeholder="Mật khẩu"
            name="password"
            type="password"
          />
        </div>
        <div className="fields__wrapper">
          <Input
            onChange={(e) =>
              setConfirmPassword((e.target as HTMLInputElement).value)
            }
            placeholder="Xác nhận mật khẩu"
            name="confirm"
            type="password"
          />
        </div>
      </div>
      <div className="sign-up-form__save-pw">
        <label>Lưu mật khẩu?</label>
        <input type="checkbox" />
      </div>
      <div className="sign-up-form__actions">
        <Link to={`/${SIGN_IN_ROUTE}`} className="actions__btn register">
          Quay lại đăng nhập
        </Link>
        <button onClick={handleOnSubmit} className="actions__btn login">
          Tạo
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;