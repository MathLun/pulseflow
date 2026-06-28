

import { buildServer } from './server';
import { env } from './config/env';

import { PostgresDatabase }
from './infra/database';

async function bootstrap() {
  const database = new PostgresDatabase(env.DATABASE_URL);
  await database.connect();

  const app = await buildServer({ database });

  await app.listen({
    host: env.HOST,
    port: env.PORT
  });

  console.log('🚀 PulseFlow API Running');
  console.log(`🌐 Link de Acesso: http://${env.HOST === '127.0.0.1' ? 'localhost' : env.HOST}:${env.PORT}`);
}

bootstrap();
