import { User } from './User.js';

export class UserContainer {
  users: Map<string, User> = new Map();

  public addUser(username: string, password: string, displayName: string, admin: boolean): void {
    if (this.users.has(username)) {
      throw new Error('Uzytkownik o takiej nazwie juz istnieje!');
    }

    for (const user of this.users.values()) {
      if (user.getDisplayName() === displayName) {
        throw new Error('Uzytkownik z taka nazwa wyswietlania juz istnieje!');
      }
    }

    this.users.set(username, new User(username, password, displayName, admin));
    console.log(`Zarejestrowano uzytkownika [${username}]`);
  }

  public getUser(username: string): User {
    const user = this.users.get(username);
    if (user === undefined) {
      throw new Error(`Uzytkownik o nazwie ${username} nie istnieje`);
    }
    return user;
  }

  public removeUser(user: User, username: string): void {
    if (user.getUsername() === username) {
      throw new Error('Nie mozna usunac aktywnego uzytkownika!');
    }

    if (user.isAdmin() === false) {
      throw new Error('Brak wymaganych uprawnien do usuniecia tego uzytkownika!');
    }

    if (!this.users.has(username)) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    this.users.delete(username);
  }

  public setDisplayName(user: User, username: string, displayName: string): void {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error('Brak wymaganych uprawnien do modyfikowania tego uzytkownika!');
      }
    }

    if (!this.users.has(username)) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    const userToModify = this.users.get(username);

    if (userToModify === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    userToModify.setDisplayName(displayName);
    this.users.delete(username);
    this.users.set(username, userToModify);
  }

  public setPassword(user: User, username: string, password: string): void {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error('Brak wymaganych uprawnien do modyfikowania tego uzytkownika!');
      }
    }

    if (!this.users.has(username)) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    const userToModify = this.users.get(username);

    if (userToModify === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    userToModify.setPassword(password);
    this.users.delete(username);
    this.users.set(username, userToModify);
  }
}
