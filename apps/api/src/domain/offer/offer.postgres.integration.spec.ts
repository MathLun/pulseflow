

import 'dotenv/config';

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { env } 
from '../../config/env';

import { Offer } 
from './offer';

import { PostgresDatabase } 
from '../../infra/database';

import { CreateStoresTableMigration } 
from '../../infra/database/migrations/001-create-stores-table';

import { CreateOffersTableMigration } 
from '../../infra/database/migrations/003-create-offers-table';

import { StorePostgresRepository } 
from '../store';

import { OfferPostgresRepository } 
from './offer.postgres';

const hasDatabase = Boolean(process.env.DATABASE_URL_TEST);

(hasDatabase ? describe : describe.skip)(
  'OfferPostgresRepository',
  () => {
    const database = new PostgresDatabase(env.DATABASE_URL_TEST);

    const storeRepository = new StorePostgresRepository(database);
    const repository = new OfferPostgresRepository(database);

    beforeAll(async () => {
      await database.connect();

      await new CreateStoresTableMigration().up(database);
      await new CreateOffersTableMigration().up(database);
    });

    beforeEach(async () => {
      await database.query(`DELETE FROM offers`);
      await database.query(`DELETE FROM stores`);
    });

    afterAll(async () => {
      await database.disconnect();
    });

    async function createStore() {
      const store = {
        id: 'store-1',
        name: 'Mercado Central',
        createdAt: new Date(),
      };

      await storeRepository.create(store);

      return store;
    }

    async function createOffer(): Promise<Offer> {
      const store = await createStore();

      const offer: Offer = {
        id: 'offer-1',
        storeId: store.id,
        title: 'Oferta da Semana',
        description: '50% de desconto',
        createdAt: new Date(),
      };

      await repository.create(offer);

      return offer;
    }

    it('should create an offer', async () => {
      const offer = await createOffer();

      const result = await repository.findById(offer.id);

      expect(result).toEqual(offer);
    });

    it('should return all offers', async () => {
      await createOffer();

      const offers = await repository.findAll();

      expect(offers).toHaveLength(1);
    });

    it('should update an offer', async () => {
      const offer = await createOffer();

      const updatedOffer: Offer = {
        ...offer,
        title: 'Nova Oferta',
        description: '70% de desconto',
      };

      await repository.update(updatedOffer);

      const result = await repository.findById(offer.id);

      expect(result).toEqual(updatedOffer);
    });

    it('should delete an offer', async () => {
      const offer = await createOffer();

      await repository.delete(offer.id);

      const result = await repository.findById(offer.id);

      expect(result).toBeNull();
    });

    it('should return null when offer does not exist', async () => {
      const result = await repository.findById('invalid-id');

      expect(result).toBeNull();
    });
  },
);
