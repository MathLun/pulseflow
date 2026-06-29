


import { describe, expect, it, beforeEach }
from 'vitest';

/* Domain Layer
 * ---------------------------------
 * @entity Offer
 * @contract OfferRepository
 * @provider OfferMemoryRepository
 * ---------------------------------
 */
import {
  Offer,
  OfferRepository,
  OfferMemoryRepository 
} from '../../domain/offer';

/* Application Layer
 * ---------------------------------
 * @usecase FindOfferByIdUseCase
 * ---------------------------------
 */
import { FindOfferByIdUseCase }
from './find-offer-by-id';

describe('FindOfferByIdUseCase', () => {

	let offerRepository: OfferRepository;
	let usecase: FindOfferByIdUseCase;

	beforeEach(() => {
	  offerRepository = new OfferMemoryRepository();
	  usecase = new FindOfferByIdUseCase(offerRepository);
	});

	it('should find offer by id', async () => {
	  const offer: Offer = {
		id: 'offer-1',
		storeId: 'store-1',
		title: 'Oferta da semana',
		description: '50% de desconto',
		createdAt: new Date()
	  };

	  await offerRepository.create(offer);

	  const result = await usecase.execute({ 
		  id: offer.id 
	  });

	  expect(result).toEqual(offer);
	});

	it('should return null when offer not exists', async () => {
	  const result = await usecase.execute({
		id: 'invalid-id'
	  });

	  expect(result).toBeNull();
	});
});
