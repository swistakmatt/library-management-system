export abstract class Repository<T> {
  protected statementContainsId(statement: unknown): statement is { id: number } {
    return (
      statement !== null && typeof statement === 'object' &&
      'id' in statement && typeof statement.id === 'number'
    );
  }

  public abstract getById(id: number): Promise<T>;

  public abstract set(instance: T): Promise<number>;

  public abstract update(instance: T): Promise<void>;

  protected abstract statementToInstance(statement: unknown): T;
}
