import { Database as SqliteDb } from 'sqlite3';


type SQLParamType = string | number | boolean;

interface AsyncDatabaseInterface {
  close(): Promise<void>;

  run(sql: string, params?: { [index: string]: SQLParamType }): Promise<void>;

  get<T>(sql: string, params?: { [index: string]: SQLParamType }): Promise<T | undefined>;

  all<T>(sql: string, params?: { [index: string]: SQLParamType }): Promise<T[]>;

  exec(sql: string): Promise<void>;
}

export class AsyncDatabase implements AsyncDatabaseInterface {
  constructor(private database: SqliteDb) { }

  public get direct(): SqliteDb {
    return this.database;
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.close((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public run(sql: string, params?: { [index: string]: SQLParamType }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.run(sql, params ?? {}, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public get<T>(sql: string, params?: { [index: string]: SQLParamType }): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.database.get(sql, params ?? {}, (err, rows) => {
        if (err) reject(err);
        resolve(rows as T);
      });
    });
  }

  public all<T>(sql: string, params?: { [index: string]: SQLParamType }): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.database.all(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows as T[]);
      });
    });
  }

  public exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
      }
      );
    });
  }
}
