

import { describe, expect, it } from 'vitest';

import type { Offer } 
from './offer';

import { OfferMemoryRepository } 
from './offer.memory';

describe('OfferMemoryRepository', () => {
  const makeOffer = (): Offer => ({
    id: 'offer-1',
    storeId: 'store-1',
    title: 'Oferta da Semana',
    description: '50% de desconto',
    createdAt: new Date(),
  });

  it('should create an offer', async () => {
    const repository = new OfferMemoryRepository();

    const offer = makeOffer();

    await repository.create(offer);

    const result = await repository.findById(offer.id);

    expect(result).toEqual(offer);
  });

  it('should return all offers', async () => {
    const repository = new OfferMemoryRepository();

    const offer1 = makeOffer();

    const offer2: Offer = {
      id: 'offer-2',
      storeId: 'store-1',
      title: 'Oferta Relâmpago',
      description: 'Leve 3 Pague 2',
      createdAt: new Date(),
    };

    await repository.create(offer1);
    await repository.create(offer2);

    const offers = await repository.findAll();

    expect(offers).toHaveLength(2);
    expect(offers).toEqual([offer1, offer2]);
  });

  it('should update an offer', async () => {
    const repository = new OfferMemoryRepository();

    const offer = makeOffer();

    await repository.create(offer);

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
    const repository = new OfferMemoryRepository();

    const offer = makeOffer();

    await repository.create(offer);

    await repository.delete(offer.id);

    const result = await repository.findById(offer.id);

    expect(result).toBeNull();
  });

  it('should return null when offer does not exist', async () => {
    const repository = new OfferMemoryRepository();

    const result = await repository.findById('invalid-id');

    expect(result).toBeNull();
  });
});
