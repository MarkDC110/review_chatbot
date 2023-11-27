import { FC } from 'react';
import { useParams } from 'react-router-dom';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../configs/constants';
import './style.css';

export type SignPageProps = {};
const SignPage: FC<SignPageProps> = () => {
  const { signSlug } = useParams();

  return (
    <div id="sign-page">
      <div className="sign-page__container">
        <div className="sign-page__section left">
        <h1>Nghiên cứu khoa học</h1>
        --------------------------------
        <h2>NGHIÊN CỨU MỘT SỐ THUẬT TOÁN AI</h2>
        <h2>VÀ ỨNG DỤNG XÂY DỰNG HỆ THỐNG CHATBOT TỰ ĐỘNG</h2>
        <h3>
          Chủ nhiệm: <span>Đinh Công Nhật</span>
          <p>GVHD: Ths.Ngô Thị Thanh Hòa</p>
        </h3>
        <img src="/images/background.png"/>
        </div>
        <div className="sign-page__section right">
          {signSlug === SIGN_IN_ROUTE && <SignInForm />}
          {signSlug === SIGN_UP_ROUTE && <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default SignPage;
