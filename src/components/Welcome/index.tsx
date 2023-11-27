import { FC } from 'react';
import './style.css';

export type WelcomeProps = {};
const Welcome: FC<WelcomeProps> = () => {
  return (
    <div className="c-welcome">
      <div className="c-welcome-container">
        <h1>Nghiên cứu khoa học</h1>
        <h2>NGHIÊN CỨU MỘT SỐ THUẬT TOÁN AI</h2>
        <h2>VÀ ỨNG DỤNG XÂY DỰNG HỆ THỐNG CHATBOT TỰ ĐỘNG</h2>
        <h3>
          Chủ nhiệm: <span>Đinh Công Nhật</span>
          <p>GVHD: Ths.Ngô Thị Thanh Hòa</p>
        </h3>
        <div className="c-welcome__instruction">
          <img src="/images/left-welcome.png" alt="hướng dẫn" />
          <span>Chọn một trong các Bot để bắt đầu trò truyện!</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
