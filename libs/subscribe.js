import { mutate } from 'swr';

let latestData = null;

const subscribe = async (query, endPoint) => {
  if (typeof window !== 'undefined') {
    const ws = new WebSocket(endPoint, 'graphql-ws');
    const init_msg = {
      type: 'connection_init',
      payload: { headers },
    };
    ws.onopen = function (e) {
      ws.send(JSON.stringify(init_msg));
      const msg = {
        id: '1',
        type: 'start',
        payload: {
          variables: {},
          extensions: {},
          operationName: null,
          query,
        },
      };
      ws.send(JSON.stringify(msg));
    };
    ws.onmessage = function (data) {
      const finalData = JSON.parse(data.data);
      if (finalData.type === 'data') {
        latestData = finalData.payload.data;
        mutate('subscription', latestData, false);
        return latestData;
      }
    };
  }
};

export default subscribe;
