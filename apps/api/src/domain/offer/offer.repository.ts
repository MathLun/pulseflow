

import { Offer } from './offer';

export interface OfferRepository {
  create(offer: Offer): Promise<void>;

  findById(
    id: string
  ): Promise<Offer | null>;

  findAll(): Promise<Offer[]>;

  update(offer: Offer): Promise<void>;

  delete(id: string): Promise<void>;
}
