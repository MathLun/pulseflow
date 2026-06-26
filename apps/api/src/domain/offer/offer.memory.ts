

import type { Offer } 
from './offer';

import { OfferRepository }
from './offer.repository';

export class OfferMemoryRepository 
implements OfferRepository {
  private readonly offers: Offer[] = [];

  async create(offer: Offer): Promise<void> {
    this.offers.push(offer);
  }

  async findById(id: string): Promise<Offer | null> {
    return this.offers.find((offer) => offer.id === id) ?? null;
  }

  async findAll(): Promise<Offer[]> {
    return [...this.offers];
  }

  async update(offer: Offer): Promise<void> {
    const index = this.offers.findIndex(
      (currentOffer) => currentOffer.id === offer.id,
    );

    if (index === -1) {
      return;
    }

    this.offers[index] = offer;
  }

  async delete(id: string): Promise<void> {
    const index = this.offers.findIndex(
      (offer) => offer.id === id,
    );

    if (index === -1) {
      return;
    }

    this.offers.splice(index, 1);
  }
}
