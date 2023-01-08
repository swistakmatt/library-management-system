export class User {
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

  public setPassword(newPassword: string): void {
    if (newPassword === this.password) {
      throw new Error('Nowe haslo jest takie samo jak poprzednie');
    }
    this.password = newPassword;
  }

  public setDisplayName(newDisplayName: string): void {
    if (newDisplayName === this.displayName) {
      throw new Error('Nowa nazwa jest taka sama jak poprzednia');
    }
    this.displayName = newDisplayName;
  }

  public setAdmin(admin: boolean): void {
    this.admin = admin;
  }

  public print(): void {
    console.log(`   Nazwa uzytkownika: ${this.username}`);
    console.log(`   Haslo: ${this.password}`);
    console.log(`   Nazwa wyswietlana: ${this.displayName}`);
    console.log(`   Admin: ${this.admin ? 'true' : 'false'}`);
  }
}
