import { readdirSync, readFileSync } from 'fs';
import sqlite from 'sqlite3';
import { AsyncDatabase } from './AsyncDatabase.js';


export class Database {
  private static instance?: Database;

  private db: AsyncDatabase;

  private constructor() {
    this.db = new AsyncDatabase(new sqlite.Database('db.sqlite', this.handleInitError));
  }

  public async initTables(): Promise<void> {
    try {
      const tables = readdirSync('./resources/databases/schemas', { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.sql'))
        .map((dirent) => readFileSync(`./resources/databases/schemas/${dirent.name}`, { encoding: 'utf-8' }));


      await Promise.all(tables.map((table) => this.db.run(table)));
    } catch (error) {
      console.error(error);
    }
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
