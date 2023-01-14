import { Menu } from './Menu.js';
import * as readlineSync from 'readline-sync';
import { UserContainer } from '../users/UserContainer.js';
import { LibraryContainer } from '../media/LibraryContainer.js';
import { User } from '../users/User.js';
import chalk from 'chalk';

export class Interface {
  public static app(): void {
    const users = new UserContainer();
    const library = new LibraryContainer();

    let activeUser: User | null = null;
    let loop = true;
    let option = -1;

    do {
      console.clear();
      Menu.printMenuOptions();

      option = parseInt(readlineSync.question(chalk.green('>')));

      switch (option) {
        case 1:
          console.clear();
          Menu.registerUser(users);
          break;
        case 2:
          console.clear();
          activeUser = null;
          while (activeUser === null) {
            activeUser = Menu.loginUser(users);
          }
          console.log(
            chalk.green(`Zalogowano jako [${activeUser.getDisplayName()}]`)
          );
          break;
        case 3:
          console.clear();
          if (activeUser !== null) {
            Menu.changeDisplayname(activeUser);
          }
          break;
        case 4:
          console.clear();
          if (activeUser !== null) {
            Menu.changeAdmin(activeUser);
          }
          break;
        case 5:
          console.clear();
          if (activeUser !== null) {
            Menu.addMovie(activeUser, library);
          }
          break;
        case 6:
          console.clear();
          if (activeUser !== null) {
            Menu.addEpisode(activeUser, library);
          }
          break;
        case 7:
          console.clear();
          if (activeUser !== null) {
            Menu.addSong(activeUser, library);
          }
          break;
        case 8:
          console.clear();
          if (activeUser !== null) {
            Menu.addEbook(activeUser, library);
          }
          break;
        case 13:
          console.clear();
          if (activeUser !== null) {
            Menu.removeMovie(activeUser, library);
          }
          break;
        case 14:
          console.clear();
          if (activeUser !== null) {
            Menu.removeEpisode(activeUser, library);
          }
          break;
        case 15:
          console.clear();
          if (activeUser !== null) {
            Menu.removeSong(activeUser, library);
          }
          break;
        case 16:
          console.clear();
          if (activeUser !== null) {
            Menu.removeEbook(activeUser, library);
          }
          break;
        case 17:
          console.clear();
          if (activeUser !== null) {
            library.print(activeUser);
          }
          break;
        case 18:
          console.clear();
          if (activeUser !== null) {
            library.printUserMedia(activeUser);
          }
          break;
        case 19:
          console.clear();
          if (activeUser !== null) {
            Menu.printMovie(activeUser, library);
          }
          break;
        case 20:
          console.clear();
          if (activeUser !== null) {
            Menu.printEpisode(activeUser, library);
          }
          break;
        case 21:
          console.clear();
          if (activeUser !== null) {
            Menu.printSong(activeUser, library);
          }
          break;
        case 22:
          if (activeUser !== null) {
            Menu.printEbook(activeUser, library);
          }
          break;
        case 23:
          console.clear();
          if (activeUser !== null) {
            Menu.printAlbum(activeUser, library);
          }
          break;
        case 24:
          library.saveData();
          users.saveData();
          break;
        case 25:
          library.readData();
          users.readData();
          break;
        case 26:
          console.clear();
          if (activeUser !== null) {
            activeUser.print();
          }
          break;
        case 0:
          loop = false;
          console.clear();
          break;
        default:
          console.clear();
          console.log(chalk.red('Nie ma takiej opcji!'));
          break;
      }
    } while (loop);
  }
}
