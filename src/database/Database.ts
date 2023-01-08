import { Database as SqliteDb } from 'sqlite3';
import { AsyncDatabase } from './AsyncDatabase';


export class Database {
  private static instance?: Database;

  private db: AsyncDatabase;

  private constructor() {
    this.db = new AsyncDatabase(new SqliteDb('db.sqlite', this.handleInitError));
  }

  private handleInitError = (err: Error | null): void => {
    if (err === null) return;

    console.error(err);
  };

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public static destroyInstance(): void {
    Database.instance = undefined;
  }

  public static getConnection(): AsyncDatabase {
    const instance = Database.getInstance();

    return instance.db;
  }

  public static closeConnection(): void {
    Database.getConnection().direct.close();

    Database.destroyInstance();
  }
}
