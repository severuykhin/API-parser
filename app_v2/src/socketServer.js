import WebSocket from 'ws';
import YandexApi from './api/yandex';

class SocketServer {
  init() {

    const server = new WebSocket.Server({ port: 8080 });

    server.on('connection', ws => {
      ws.on('message', async (message) => {
        
        let parsedRequestData = JSON.parse(message);

        let data = await YandexApi.parse(parsedRequestData.phrase, parsedRequestData.activeCity, parsedRequestData.fileDescriptor);

        server.clients.forEach( client => {
          client.send(JSON.stringify(data));
        });

      });
    });

    console.log('WebSocket server listening on port: 8080');

  }
}

export default new SocketServer();