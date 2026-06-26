

import type { Offer } 
from './offer';

import { OfferRepository }
from './offer.repository';

import { PostgresDatabase } 
from '../../infra/database';

export class OfferPostgresRepository 
implements OfferRepository {
  constructor(
    private readonly database: PostgresDatabase,
  ) {}

  async create(offer: Offer): Promise<void> {
    await this.database.query(
      `
        INSERT INTO offers (
          id,
          store_id,
          title,
          description,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        offer.id,
        offer.storeId,
        offer.title,
        offer.description,
        offer.createdAt,
      ],
    );
  }

  async findById(id: string): Promise<Offer | null> {
    const result = await this.database.query<Offer>(
      `
        SELECT
          id,
          store_id AS "storeId",
          title,
          description,
          created_at AS "createdAt"
        FROM offers
        WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async findAll(): Promise<Offer[]> {
    const result = await this.database.query<Offer>(
      `
        SELECT
          id,
          store_id AS "storeId",
          title,
          description,
          created_at AS "createdAt"
        FROM offers
      `,
    );

    return result.rows;
  }

  async update(offer: Offer): Promise<void> {
    await this.database.query(
      `
        UPDATE offers
        SET
          store_id = $2,
          title = $3,
          description = $4
        WHERE id = $1
      `,
      [
        offer.id,
        offer.storeId,
        offer.title,
        offer.description,
      ],
    );
  }

  async delete(id: string): Promise<void> {
    await this.database.query(
      `
        DELETE FROM offers
        WHERE id = $1
      `,
      [id],
    );
  }
}
