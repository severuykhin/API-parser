import WebSocket from 'ws';
import YandexApi from './api/yandex';
import KeyManager from './services/KeyManager';
import keys from './data/keys.json';

/**
 * Схема ответа при успешном выполнении запроса
 * @param {object} data - содержание сообщения
 */
const getSuccessReponseSchema = (type, data) => {
  return  {
    result: 'success',
    type: type,
    data: {...data}
  };
}

/**
 * Схема ответа при ошибочном выполнении операции
 * @param {string} type - тип ошибки 
 * @param {object} data -содержание сообщения
 */
const getErrorReponseSchema = (type, data) => {
  return {
    result: 'error',
    type: type, 
    data: {...data}
  };
}

const PORT = 8080;

class SocketServer {

  constructor() {
    this.server = null;
  }

  init() {

    // Create web socket server instance
    this.server = new WebSocket.Server({ port: PORT });

    // Create API keys manager
    const keysManager = new KeyManager({ keys });

    // Create instance of Yandex API parser
    const parser = new YandexApi({
      keysManager: keysManager,
      onData: this.sendSuccess,
      onError: this.sendError
    });

    // Action on connection
    this.server.on('connection', ws => {

      ws.on('message', async (message) => { 

        let data = JSON.parse(message);

        parser.load(data);

        /**
         * @todo - сообщение об успешном окончании парсинга города перевести сюда
         * вместо коллбэка
         */
        let response = await parser.parse();

      });
    });

    console.log('WebSocket server listening on port: 8080');

  }

  sendMessage(message) {
    this.server.clients.forEach( client => {
      client.send(JSON.stringify(message));
    });
  }

  sendSuccess = (type, data) => {
    let message = getSuccessReponseSchema(type, data);
    this.sendMessage(message);
  }

  sendError = (type, data) => {
    let errorMessage = getErrorReponseSchema(type, data);
    this.sendMessage(errorMessage);
  }
}

export default new SocketServer();