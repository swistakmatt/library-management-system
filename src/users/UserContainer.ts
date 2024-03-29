import chalk from 'chalk';
import { User } from './User';
import { UserRepository } from './UserRepository';

export class UserContainer {
  private userRepository: UserRepository = new UserRepository();

  public async addUser(
    username: string,
    password: string,
    displayName: string,
    admin: boolean
  ): Promise<void> {
    if (await this.userRepository.hasUsername(username)) {
      throw new Error('A user with that name already exists!');
    }

    const existingDisplayName = await this.userRepository.hasUsername(
      displayName
    );

    if (existingDisplayName) {
      throw new Error('A user with this display name already exists!');
    }

    await this.userRepository.set(
      new User(username, password, displayName, admin)
    );
    console.log(chalk.green(`User registered `) + `[${username}]`);
  }

  public async getUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.getByUsername(username);
    if (!user) {
      throw new Error(`User named ${username} does not exist`);
    }

    if (user.getPassword() !== password) {
      throw new Error('Incorrect password!');
    }

    return user;
  }

  public async removeUser(user: User, username: string): Promise<void> {
    if (user.getUsername() === username) {
      throw new Error('Cannot delete active user!');
    }

    if (user.isAdmin() === false) {
      throw new Error(
        'You do not have the required permissions to delete this user!'
      );
    }

    if (await this.userRepository.hasUsername(username) === undefined) {
      throw new Error('User does not exist!');
    }

    const target = await this.userRepository.getByUsername(username);

    await this.userRepository.delete(target);
  }

  public async setDisplayName(
    user: User,
    username: string,
    displayName: string
  ): Promise<void> {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error(
          'You do not have the required permissions to modify this user!'
        );
      }
    }

    if (this.userRepository.hasUsername(username) === undefined) {
      throw new Error('User does not exist!');
    }

    const userToModify = await this.userRepository.getByUsername(username);

    if (userToModify === undefined) {
      throw new Error('User does not exist!');
    }

    userToModify.setDisplayName(displayName);
    await this.userRepository.update(userToModify);
  }

  public async setPassword(user: User, username: string, password: string): Promise<void> {
    if (user.getUsername() !== username) {
      if (user.isAdmin() === false) {
        throw new Error(
          'You do not have the required permissions to modify this user!'
        );
      }
    }

    if (this.userRepository.hasUsername(username) === undefined) {
      throw new Error('User does not exist!');
    }

    const userToModify = await this.userRepository.getByUsername(username);

    if (userToModify === undefined) {
      throw new Error('User does not exist!');
    }

    userToModify.setPassword(password);
    await this.userRepository.update(userToModify);
  }
}
