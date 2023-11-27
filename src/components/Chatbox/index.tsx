import Chat, { Bubble, MessageProps, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import '@chatui/core/es/styles/index.less';
import { FC, useContext, useEffect } from 'react';
import { IUserCtx, UserCtx } from '../../context/UserCtx';
import chatService from '../../services/chat.service';
import { BotItemData } from '../BotItem';
import './style.css';

export type ChatboxProps = {
  bot: BotItemData;
};

const Chatbox: FC<ChatboxProps> = ({ bot }) => {
  const { messages, appendMsg, setTyping, prependMsgs, resetList } = useMessages([]);
  const { user } = useContext(UserCtx) as IUserCtx;

  function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
        user: {
          avatar: user?.avatar
        }
      });

      setTyping(true);

      chatService
        .sendMessage({
          userId: user?._id!,
          botId: bot._id,
          message: val.trim(),
        })
        .then((response) => {
          if (response.success) {
            appendMsg({
              type: 'text',
              content: { text: response.message },
              user: {
                avatar: bot.avatar,
              },
            });
          }
        })
        .catch(console.log);
    }
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  useEffect(() => {
    if (!user || !bot) return;

    chatService
      .queryMessages({
        userId: user._id,
        botId: bot._id,
      })
      .then((response) => {
        if (response.success) {
          const rspMessages = response.message as Array<any>;
          const msgs: MessageProps[] = rspMessages.map((e) => ({
            _id: e._id['$oid'],
            type: 'text',
            content: { text: e.content },
            user: {
              avatar: e.sent_by === 1 ? bot.avatar : user.avatar,
            },
            position: e.sent_by === 0 ? 'right' : 'left'
          }));

          prependMsgs(msgs.length > 0 ? msgs : [{
            _id: "Hello_message",
            type: 'text',
            content: { text: "Chào mừng bạn ^^" },
            user: {
              avatar: bot.avatar,
            },
            position: 'left'
          }]);
        }
      })
      .catch(console.log)
      .finally(() => {
        setTyping(false);
      });
    // eslint-disable-next-line
  }, [user, bot]);

  useEffect(() => {
    return () => {
      resetList()
    }
    // eslint-disable-next-line
  }, [bot])

  return (
    <div id="c-chatbox-wrapper">
      <Chat
        locale="vi_VN"
        navbar={{ title: bot.name }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        placeholder="Nhập câu hỏi của bạn..."
      />
    </div>
  );
};

export default Chatbox;
