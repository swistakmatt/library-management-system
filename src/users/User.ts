import chalk from 'chalk';
import { DatabaseElement } from '../database/DatabaseElement.js';

export interface UserConstructor {
  username: string;
  password: string;
  displayName: string;
  admin: boolean;
}

export class User implements DatabaseElement {
  private id: number | null = null;
  private username: string;
  private password: string;
  private displayName: string;
  private admin: boolean;

  constructor(username: string, password: string, displayName: string, admin: boolean) {
    this.username = username;
    this.password = password;
    this.displayName = displayName;
    this.admin = admin;
  }

  public static isUserConstructor(obj: unknown): obj is UserConstructor {
    return (
      obj !== null && typeof obj === 'object' &&
      // 'id' in obj && typeof obj.id === 'number' &&
      'username' in obj && typeof obj.username === 'string' &&
      'password' in obj && typeof obj.password === 'string' &&
      'displayName' in obj && typeof obj.displayName === 'string' &&
      'admin' in obj && typeof obj.admin === 'boolean'
    );
  }

  public getId(): number | null {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getDisplayName(): string {
    return this.displayName;
  }

  public isAdmin(): boolean {
    return this.admin;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setPassword(newPassword: string): void {
    if (newPassword === this.password) {
      throw new Error('The new password is the same as the previous one');
    }
    this.password = newPassword;
  }

  public setDisplayName(newDisplayName: string): void {
    if (newDisplayName === this.displayName) {
      throw new Error('The new name is the same as the previous one');
    }
    this.displayName = newDisplayName;
  }

  public setAdmin(admin: boolean): void {
    this.admin = admin;
  }

  public print(): void {
    console.log(`   ` + chalk.yellow(`Username: `) + `${this.username}`);
    console.log(`   ` + chalk.yellow(`Password: `) + `${this.password}`);
    console.log(`   ` + chalk.yellow(`Display name: `) + `${this.displayName}`);
    console.log(`   ` + chalk.yellow(`Admin: `) + `${this.admin ? 'true' : 'false'}`);
  }
}
