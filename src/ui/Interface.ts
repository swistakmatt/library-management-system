import { Menu } from './Menu';
import * as readlineSync from 'readline-sync';
import { UserContainer } from '../users/UserContainer';
import { LibraryContainer } from '../media/LibraryContainer';
import { User } from '../users/User';
import chalk from 'chalk';

export class Interface {
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async app(): Promise<void> {
    const users = new UserContainer();
    const library = new LibraryContainer();

    let activeUser: User | null = null;
    let loop = true;
    let option = -1;

    do {
      console.clear();
      Menu.printMenuOptions();

      option = parseInt(readlineSync.question(chalk.green('>')));

      try {
        switch (option) {
          case 1:
            console.clear();
            await Menu.registerUser(users);
            break;
          case 2:
            console.clear();
            activeUser = null;
            while (activeUser === null) {
              activeUser = await Menu.loginUser(users);
            }
            console.log(
              chalk.green(`Logged in as [${activeUser.getDisplayName()}]`)
            );

            await Interface.sleep(1000);
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
              await Menu.addMovie(activeUser, library);
            }
            break;
          case 6:
            console.clear();
            if (activeUser !== null) {
              await Menu.addEpisode(activeUser, library);
            }
            break;
          case 7:
            console.clear();
            if (activeUser !== null) {
              await Menu.addSong(activeUser, library);
            }
            break;
          case 8:
            console.clear();
            if (activeUser !== null) {
              await Menu.addEbook(activeUser, library);
            }
            break;
          case 9:
            console.clear();
            if (activeUser !== null) {
              await Menu.modifyMovie(activeUser, library);
            }
            break;
          case 10:
            console.clear();
            if (activeUser !== null) {
              await Menu.modifyEpisode(activeUser, library);
            }
            break;
          case 11:
            console.clear();
            if (activeUser !== null) {
              await Menu.modifySong(activeUser, library);
            }
            break;
          case 12:
            console.clear();
            if (activeUser !== null) {
              await Menu.modifyEbook(activeUser, library);
            }
            break;
          case 13:
            console.clear();
            if (activeUser !== null) {
              await Menu.removeMovie(activeUser, library);
            }
            break;
          case 14:
            console.clear();
            if (activeUser !== null) {
              await Menu.removeEpisode(activeUser, library);
            }
            break;
          case 15:
            console.clear();
            if (activeUser !== null) {
              await Menu.removeSong(activeUser, library);
            }
            break;
          case 16:
            console.clear();
            if (activeUser !== null) {
              await Menu.removeEbook(activeUser, library);
            }
            break;
          case 17:
            console.clear();
            if (activeUser !== null) {
              await library.print(activeUser);
              readlineSync.keyInPause();
            }
            break;
          case 18:
            console.clear();
            if (activeUser !== null) {
              await library.printUserMedia(activeUser);
              readlineSync.keyInPause();
            }
            break;
          case 19:
            console.clear();
            if (activeUser !== null) {
              await Menu.printMovie(activeUser, library);
              readlineSync.keyInPause();
            }
            break;
          case 20:
            console.clear();
            if (activeUser !== null) {
              await Menu.printEpisode(activeUser, library);
              readlineSync.keyInPause();
            }
            break;
          case 21:
            console.clear();
            if (activeUser !== null) {
              await Menu.printSong(activeUser, library);
              readlineSync.keyInPause();
            }
            break;
          case 22:
            if (activeUser !== null) {
              await Menu.printEbook(activeUser, library);
              readlineSync.keyInPause();
            }
            break;
          case 23:
            console.clear();
            if (activeUser !== null) {
              await Menu.printAlbum(activeUser, library);
              readlineSync.keyInPause();
            }
            break;
          case 24:
            console.clear();
            if (activeUser !== null) {
              await Menu.undo(activeUser, library);
            }
            break;
          case 25:
            console.clear();
            if (activeUser !== null) {
              await Menu.undoUndo(activeUser, library);
            }
            break;
          case 26:
            console.clear();
            if (activeUser !== null) {
              activeUser.print();
              readlineSync.keyInPause();
            }
            break;
          case 0:
            loop = false;
            console.clear();
            break;
          default:
            console.clear();
            console.log(chalk.red('This option does not exist!'));
            readlineSync.keyInPause();
            break;
        }
      } catch (err) {
        if (typeof err === 'object' && err !== null && 'message' in err) console.log(chalk.red(err.message));
        readlineSync.keyInPause('Press any key to continue...', { hideEchoBack: true });
      }
    } while (loop);
  }
}
