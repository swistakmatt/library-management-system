import { Database } from '../../database/Database.js';
import { DatabaseElement } from '../../database/DatabaseElement.js';


export abstract class Repository<T extends DatabaseElement> {
  protected abstract tableName: string;

  protected statementContainsId(statement: unknown): statement is { id: number } {
    return (
      statement !== null && typeof statement === 'object' &&
      'id' in statement && typeof statement.id === 'number'
    );
  }

  public async getById(id: number): Promise<T> {
    const db = Database.getConnection();

    const statement = await db.get(
      `SELECT * FROM ${this.tableName}
      WHERE id = $id`, {
        $id: id,
      });

    return this.statementToInstance(statement);
  }

  public async getAll(): Promise<T[]> {
    const db = Database.getConnection();

    console.log(this.tableName);

    // i know this is potentially dangerous but it simplifies codebase
    const statement = await db.all(`SELECT * FROM ${this.tableName}`);

    return statement.map((row) => this.statementToInstance(row));
  }

  public async hasId(id: number): Promise<boolean> {
    try {
      await this.getById(id);
      return true;
    } catch (err) {
      return false;
    }
  }

  public abstract set(instance: T): Promise<number>;

  public abstract update(instance: T): Promise<void>;

  public async delete(instance: T): Promise<void> {
    const db = Database.getConnection();

    const id = instance.getId();
    if (id === null) throw new Error(`${this.tableName} id is null`);

    await db.run(`DELETE FROM ${this.tableName} WHERE id = $id`, {
      $id: id,
    });
  }

  protected abstract statementToInstance(statement: unknown): T;
}
