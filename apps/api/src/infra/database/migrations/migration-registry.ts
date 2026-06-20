

export abstract class MigrationRegistry {
  abstract findExecutedIds(): Promise<string[]>;

  abstract register(
    migrationId: string
  ): Promise<void>;
}
