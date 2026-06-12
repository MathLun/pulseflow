

import Fastify from 'fastify';
import { storeRoutes } from './routes/store-routes';

export const app = Fastify();

app.get('/health', async () => {
  return {
    status: 'ok'
  };
});

app.register(storeRoutes);
