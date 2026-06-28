import { describe, expect, it } from 'vitest';

import { OfferMemoryRepository } from '../../domain/offer';
import { ListOffersUseCase } from './list-offers';

describe('ListOffersUseCase', () => {
  it('should return all offers', async () => {
    const repository = new OfferMemoryRepository();

    const firstOffer = {
      id: 'offer-1',
      storeId: 'store-1',
      title: 'Oferta 1',
      description: 'Descrição 1',
      createdAt: new Date(),
    };

    const secondOffer = {
      id: 'offer-2',
      storeId: 'store-2',
      title: 'Oferta 2',
      description: 'Descrição 2',
      createdAt: new Date(),
    };

    await repository.create(firstOffer);
    await repository.create(secondOffer);

    const usecase = new ListOffersUseCase(repository);

    const result = await usecase.execute();

    expect(result).toHaveLength(2);

    expect(result[0]).toMatchObject({
      id: firstOffer.id,
      title: firstOffer.title,
      description: firstOffer.description,
      storeId: firstOffer.storeId,
    });

    expect(result[1]).toMatchObject({
      id: secondOffer.id,
      title: secondOffer.title,
      description: secondOffer.description,
      storeId: secondOffer.storeId,
    });
  });

  it('should return empty array when there are no offers', async () => {
    const repository = new OfferMemoryRepository();

    const usecase = new ListOffersUseCase(repository);

    const result = await usecase.execute();

    expect(result).toEqual([]);
  });
});
