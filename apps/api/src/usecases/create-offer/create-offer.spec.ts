

import { describe, expect, it } 
from 'vitest';

import { OfferMemoryRepository } 
from '../../domain/offer';

import { CreateOfferUseCase } 
from './create-offer';

describe('CreateOfferUseCase', () => {
  it('should create an offer', async () => {
    const repository = new OfferMemoryRepository();
    const useCase = new CreateOfferUseCase(repository);

    const offer = await useCase.execute({
      storeId: 'store-1',
      title: 'Oferta da Semana',
      description: '50% de desconto',
    });

    expect(offer).toMatchObject({
      storeId: 'store-1',
      title: 'Oferta da Semana',
      description: '50% de desconto',
    });
  });

  it('should generate an id', async () => {
    const repository = new OfferMemoryRepository();
    const useCase = new CreateOfferUseCase(repository);

    const offer = await useCase.execute({
      storeId: 'store-1',
      title: 'Oferta da Semana',
      description: '50% de desconto',
    });

    expect(offer.id).toBeDefined();
    expect(typeof offer.id).toBe('string');
  });

  it('should generate createdAt', async () => {
    const repository = new OfferMemoryRepository();
    const useCase = new CreateOfferUseCase(repository);

    const offer = await useCase.execute({
      storeId: 'store-1',
      title: 'Oferta da Semana',
      description: '50% de desconto',
    });

    expect(offer.createdAt).toBeInstanceOf(Date);
  });

  it('should persist offer', async () => {
    const repository = new OfferMemoryRepository();
    const useCase = new CreateOfferUseCase(repository);

    const offer = await useCase.execute({
      storeId: 'store-1',
      title: 'Oferta da Semana',
      description: '50% de desconto',
    });

    const persistedOffer = await repository.findById(offer.id);

    expect(persistedOffer).toEqual(offer);
  });
});
