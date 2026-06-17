

import { Database } from '../database';

export interface Migration {
  id: string;

  up(database: Database): Promise<void>;
}
