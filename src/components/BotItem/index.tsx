import { FC } from 'react';
import './style.css';

export type BotItemData = {
  _id: number;
  name: string;
  avatar: string;
  description: string;
};

export type BotItemProps = {
  data: BotItemData;
};

const BotItem: FC<BotItemProps> = ({ data }) => {
  return (
    <div className="c-bot-item">
      <div className="c-bot-item__container">
        <img
          src={data.avatar}
          className="c-bot-item__avatar"
          alt={data.description}
        />
        <div className="c-bot-item__info">
          <span className="c-bot-item__name">{data.name}</span>
          <p className="c-bot-item__description">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BotItem;
