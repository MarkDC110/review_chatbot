import { HttpResponse } from '../common/HttpResponse';
import { BOT_ROUTES } from '../configs/constants';
import httpRequest from '../libs/http';

export interface ISendMessagePayload {
  userId: string;
  botId: number;
  message: string;
}
function sendMessage(payload: ISendMessagePayload) {
  const botUrl: string = BOT_ROUTES[payload.botId];
  return httpRequest.post<any, HttpResponse>(`/${botUrl}/message`, {
    user_id: payload.userId,
    bot_id: payload.botId,
    message: payload.message
  });
}

export interface IQueryMessagesPayload {
  userId: string;
  botId: number;
}
function queryMessages(payload: IQueryMessagesPayload) {
  const botUrl: string = BOT_ROUTES[payload.botId];
  return httpRequest.post<any, HttpResponse>(
    `/${botUrl}/get-all-message`,
    {
      user_id: payload.userId,
      bot_id: payload.botId
    }
  );
}

const chatService = {
  sendMessage,
  queryMessages,
};

export default chatService;
