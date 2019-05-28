import WebSocket from 'ws';
import YandexApi from './api/yandex';

const PORT = 8080;

class SocketServer {

  constructor() {
    this.server = null;
  }

  init() {

    this.server = new WebSocket.Server({ port: PORT });

    this.server.on('connection', ws => {
      ws.on('message', async (message) => {
        
        let data = JSON.parse(message);

        let yaParser = new YandexApi({
          request: data.phrase,
          city: data.activeCity,
          fileDescriptor: data.fileDescriptor,
          onData: this.notifyCityResults
        });

        let response = await yaParser.parse();

        this.sendMessage({
          type: 'end',
          data: response
        });

      });
    });

    console.log('WebSocket server listening on port: 8080');

  }

  sendMessage(config) {
    this.server.clients.forEach( client => {
      client.send(JSON.stringify(config));
    });
  }

  notifyCityResults = (data) => {
    this.sendMessage({
      type: 'result-notify',
      data
    });
  }
}

export default new SocketServer();