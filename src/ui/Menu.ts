import { User } from '../users/User.js';
import * as readlineSync from 'readline-sync';
import { UserContainer } from '../users/UserContainer.js';
import { Ebook } from '../media/Ebook.js';
import { Song } from '../media/Song.js';
import { Episode } from '../media/Episode.js';
import { Movie } from '../media/Movie.js';
import { LibraryContainer } from '../media/LibraryContainer.js';
import chalk from 'chalk';

export class Menu {
  public static registerUser(users: UserContainer): void {
    let admin: boolean;

    console.log(chalk.yellow('Registering a new user'));

    const username: string = readlineSync.question(
      chalk.yellow('Username: ')
    );

    const displayName: string = readlineSync.question(
      chalk.yellow('Display name: ')
    );

    const password: string = readlineSync.question(chalk.yellow('Password: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Admin [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    void users.addUser(username, password, displayName, admin);
  }

  public static addMovie(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Public [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addEpisode(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Public [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addSong(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Public [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addEbook(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Public [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static removeMovie(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Removing movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    library.removeMedia(activeUser, library.getMovies(), title, releaseYear);
  }

  public static removeEpisode(
    activeUser: User,
    library: LibraryContainer
  ): void {
    console.log(chalk.yellow('Removing episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    library.removeMedia(activeUser, library.getEpisodes(), title, releaseYear);
  }

  public static removeSong(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Removing song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    library.removeMedia(activeUser, library.getSongs(), title, releaseYear);
  }

  public static removeEbook(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Removing ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    library.removeMedia(activeUser, library.getEbooks(), title, releaseYear);
  }

  public static printAlbum(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Printing album'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const media = library.getMedia(
      activeUser,
      library.getSongs(),
      title,
      releaseYear
    ) as Song;
    library.getAlbum(media).print();
  }

  public static printMovie(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Printing information about movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const media = library.getMedia(
      activeUser,
      library.getMovies(),
      title,
      releaseYear
    ) as Movie;
    media.print();
  }

  public static printEpisode(
    activeUser: User,
    library: LibraryContainer
  ): void {
    console.log(chalk.yellow('Printing information about episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const media = library.getMedia(
      activeUser,
      library.getEpisodes(),
      title,
      releaseYear
    ) as Episode;
    media.print();
  }

  public static printSong(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Printing information about song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const media = library.getMedia(
      activeUser,
      library.getSongs(),
      title,
      releaseYear
    ) as Song;
    media.print();
  }

  public static printEbook(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Printing information about ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Release year: '))
    );

    const media = library.getMedia(
      activeUser,
      library.getEbooks(),
      title,
      releaseYear
    ) as Ebook;
    media.print();
  }

  public static changeDisplayname(activeUser: User): void {
    console.log(chalk.yellow('Changing display name'));

    const displayName: string = readlineSync.question(
      chalk.yellow('Display name: ')
    );

    activeUser.setDisplayName(displayName);
  }

  public static loginUser(users: UserContainer): User {
    console.log(chalk.yellow('Logging in'));

    const username: string = readlineSync.question(
      chalk.yellow('Username: ')
    );

    const password: string = readlineSync.question(chalk.yellow('Password: '));

    return users.getUser(username, password);
  }

  public static changeAdmin(activeUser: User): void {
    let admin: boolean;

    console.log(chalk.yellow('Changing user permissions'));

    const buf: string = readlineSync.question(
      chalk.yellow('Admin [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    activeUser.setAdminStatus(admin);
  }

  public static printMenuOptions(): void {
    console.log(chalk.yellow('Menu options'));

    console.log(
      chalk.yellow('1. ') +
        'Add user\n' +
        chalk.yellow('2. ') +
        'Log in\n' +
        chalk.yellow('3. ') +
        'Change display name\n' +
        chalk.yellow('4. ') +
        'Change user permissions\n\n' +
        chalk.yellow('5. ') +
        'Add movie\n' +
        chalk.yellow('6. ') +
        'Add episode\n' +
        chalk.yellow('7. ') +
        'Add song\n' +
        chalk.yellow('8. ') +
        'Add ebook\n\n' +
        chalk.yellow('9. ') +
        'Modify movie\n' +
        chalk.yellow('10. ') +
        'Modify episode\n' +
        chalk.yellow('11. ') +
        'Modify song\n' +
        chalk.yellow('12. ') +
        'Modify ebook\n\n' +
        chalk.yellow('13. ') +
        'Remove movie\n' +
        chalk.yellow('14. ') +
        'Remove episode\n' +
        chalk.yellow('15. ') +
        'Remove song\n' +
        chalk.yellow('16. ') +
        'Remove ebook\n\n' +
        chalk.yellow('17. ') +
        'Print content of the library\n' +
        chalk.yellow('18. ') +
        'Print user resources\n\n' +
        chalk.yellow('19. ') +
        'Print video informations\n' +
        chalk.yellow('20. ') +
        'Print episode informations\n' +
        chalk.yellow('21. ') +
        'Print song informations\n' +
        chalk.yellow('22. ') +
        'Print ebook informations\n\n' +
        chalk.yellow('23. ') +
        'Print song album\n\n' +
        chalk.yellow('26. ') +
        'Print informations about the active user\n\n' +
        chalk.red('0. ') +
        'End program\n'
    );
  }
}
