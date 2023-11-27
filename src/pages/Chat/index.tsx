import { FC, useCallback, useState } from 'react';
import BotItem, { BotItemData } from '../../components/BotItem';
import Chatbox from '../../components/Chatbox';
import UserInfo from '../../components/UserInfo';
import Welcome from '../../components/Welcome';
import './style.css';
const botlist = require('../../configs/bot-list.json');

export type ChatPageProps = {};
const data1 = {
  _id: 1,
  name: "Tư vấn bán",
  avatar: "/images/bot-icon-1.png",
  description: "Tư vấn chọn mua "
};
const ChatPage: FC<ChatPageProps> = () => {
  const [selectBot, setSelectedBot] = useState<BotItemData>()
  // const [selectBot, setSelectedBot] = useState<BotItemData>(data1);

  const handleSelectBot = useCallback(
    (data: BotItemData) => setSelectedBot(data),
    []
  );

  return (
    <div id="chat-page">
      <div className="chat-page__container">
        <div className="left-section">
          <h2 className="left-section__title">
            <img src="/images/inboxs-icon.png" alt="inboxs" />
            Chủ đề phiên trò chuyện
          </h2>
          <div className="left-section__bot-items">
            {botlist.map((e: BotItemData) => (
              <div
                key={e._id}
                className={
                  'bot-items__wrapper' +
                  (selectBot?._id === e._id ? ' active' : '')
                }
                onClick={() => handleSelectBot(e)}
              >
                <BotItem data={e} />
              </div>
            ))}
          </div>
          <div className="left-section__copyright">
            <img src="/images/copyright.png" alt="copyright" />
            <span>Copyright by HaUI 2023 ©</span>
          </div>
        </div>
        <div className="main-section">
          {selectBot ? <Chatbox bot={selectBot} /> : <Welcome />}
        </div>
        <div className="right-section">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
