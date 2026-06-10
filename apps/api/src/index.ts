

import { app } from './server';

const HOST = '127.0.0.1';
const PORT = 3333;

async function bootstrap() {
  await app.listen({
    host: HOST,
    port: PORT
  });

  console.log('🚀 PulseFlow API Running');
  console.log(`🌐 Link de Acesso: http://${HOST === '127.0.0.1' ? 'localhost' : HOST}:${PORT}`);
}

bootstrap();
