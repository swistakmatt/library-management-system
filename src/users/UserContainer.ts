import chalk from 'chalk';
import { User } from './User.js';
import { UserRepository } from './UserRepository.js';

export class UserContainer {
  private userRepository: UserRepository = new UserRepository();

  public async addUser(
    username: string,
    password: string,
    displayName: string,
    admin: boolean
  ): Promise<void> {
    const existingUser = await this.userRepository.getByUsername(username);
    if (existingUser) {
      throw new Error('Uzytkownik o takiej nazwie juz istnieje!');
    }

    const existingDisplayName = await this.userRepository.hasUsername(
      displayName
    );

    if (existingDisplayName) {
      throw new Error('Uzytkownik z taka nazwa wyswietlania juz istnieje!');
    }

    await this.userRepository.set(
      new User(username, password, displayName, admin)
    );
    console.log(chalk.green(`Zarejestrowano uzytkownika `) + `[${username}]`);
  }

  public async getUser(username: string): Promise<User> {
    const user = await this.userRepository.getByUsername(username);
    if (!user) {
      throw new Error(`Uzytkownik o nazwie ${username} nie istnieje`);
    }
    return user;
  }

  public async removeUser(user: User, username: string): Promise<void> {
    if (user.getUsername() === username) {
      throw new Error('Nie mozna usunac aktywnego uzytkownika!');
    }

    if (user.isAdmin() === false) {
      throw new Error(
        'Brak wymaganych uprawnien do usuniecia tego uzytkownika!'
      );
    }

    if (this.userRepository.hasUsername(username) === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    await this.userRepository.delete(user);
  }

  public async setDisplayName(
    user: User,
    username: string,
    displayName: string
  ): Promise<void> {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error(
          'Brak wymaganych uprawnien do modyfikowania tego uzytkownika!'
        );
      }
    }

    if (this.userRepository.hasUsername(username) === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    const userToModify = await this.userRepository.getByUsername(username);

    if (userToModify === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    userToModify.setDisplayName(displayName);
    await this.userRepository.update(userToModify);
  }

  public async setPassword(user: User, username: string, password: string): Promise<void> {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error(
          'Brak wymaganych uprawnien do modyfikowania tego uzytkownika!'
        );
      }
    }

    if (this.userRepository.hasUsername(username) === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    const userToModify = await this.userRepository.getByUsername(username);

    if (userToModify === undefined) {
      throw new Error('Uzytkownik nie istnieje!');
    }

    userToModify.setPassword(password);
    await this.userRepository.update(userToModify);
  }
}
