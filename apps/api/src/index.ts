

import { app } from './server';
import { env } from './config/env';

async function bootstrap() {
  await app.listen({
    host: env.HOST,
    port: env.PORT
  });

  console.log('🚀 PulseFlow API Running');
  console.log(`🌐 Link de Acesso: http://${env.HOST === '127.0.0.1' ? 'localhost' : env.HOST}:${env.PORT}`);
}

bootstrap();
