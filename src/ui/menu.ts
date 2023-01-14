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

    console.log(chalk.yellow('Rejestrowanie nowego uzytkownika'));

    const username: string = readlineSync.question(
      chalk.yellow('Nazwa uzytkownika: ')
    );

    const displayName: string = readlineSync.question(
      chalk.yellow('Nazwa wyswietlana: ')
    );

    const password: string = readlineSync.question(chalk.yellow('Haslo: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Administrator [T/N]: ')
    );

    if (buf === 'T' || buf === 't') {
      admin = true;
    } else {
      admin = false;
    }

    users.addUser(username, password, displayName, admin);
  }

  public static addMovie(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Dodawanie nowego filmu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Sciezka: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Publiczny [T/N]: ')
    );

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addEpisode(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Dodawanie nowego epizodu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Sciezka: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Publiczny [T/N]: ')
    );

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addSong(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Dodawanie nowego utworu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Sciezka: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Publiczny [T/N]: ')
    );

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static addEbook(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log(chalk.yellow('Dodawanie nowego ebooka'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    const path: string = readlineSync.question(chalk.yellow('Sciezka: '));

    const buf: string = readlineSync.question(
      chalk.yellow('Publiczny [T/N]: ')
    );

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public static removeMovie(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Usuwanie filmu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    library.removeMedia(activeUser, library.getMovies(), title, releaseYear);
  }

  public static removeEpisode(
    activeUser: User,
    library: LibraryContainer
  ): void {
    console.log(chalk.yellow('Usuwanie epizodu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    library.removeMedia(activeUser, library.getEpisodes(), title, releaseYear);
  }

  public static removeSong(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Usuwanie utworu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    library.removeMedia(activeUser, library.getSongs(), title, releaseYear);
  }

  public static removeEbook(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Usuwanie ebooka'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
    );

    library.removeMedia(activeUser, library.getEbooks(), title, releaseYear);
  }

  public static printAlbum(activeUser: User, library: LibraryContainer): void {
    console.log(chalk.yellow('Wyswietlanie albumu utworu'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
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
    console.log(chalk.yellow('Wyswietlanie informacji o filmie'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
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
    console.log(chalk.yellow('Wyswietlanie informacji o epizodzie'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
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
    console.log(chalk.yellow('Wyswietlanie informacji o utworze'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
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
    console.log(chalk.yellow('Wyswietlanie informacji o ebooku'));

    const title: string = readlineSync.question(chalk.yellow('Tytul: '));

    const releaseYear: number = parseInt(
      readlineSync.question(chalk.yellow('Rok wydania: '))
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
    console.log(chalk.yellow('Zmiana nazwy wyswietlania uzytkownika'));

    const displayName: string = readlineSync.question(
      chalk.yellow('Nazwa wyswietlania: ')
    );

    activeUser.setDisplayName(displayName);
  }

  public static loginUser(users: UserContainer): User {
    console.log(chalk.yellow('Logowanie'));

    const username: string = readlineSync.question(
      chalk.yellow('Nazwa uzytkownika: ')
    );

    const password: string = readlineSync.question(chalk.yellow('Haslo: '));

    return users.getUser(username, password);
  }

  public static changeAdmin(activeUser: User): void {
    let admin: boolean;

    console.log(chalk.yellow('Zmien uprawnienia uzytkownika'));

    const buf: string = readlineSync.question(
      chalk.yellow('Administrator [Y/N]: ')
    );

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    activeUser.setAdminStatus(admin);
  }

  public static printMenuOptions(): void {
    console.log(chalk.yellow('Menu programu'));

    console.log(
      chalk.yellow('1. ') +
        'Dodaj uzytkownika\n' +
        chalk.yellow('2. ') +
        'Zaloguj uzytkownika\n' +
        chalk.yellow('3. ') +
        'Zmien nazwe wyswietlania\n' +
        chalk.yellow('4. ') +
        'Zmien prawa administratora\n\n' +
        chalk.yellow('5. ') +
        'Dodaj film\n' +
        chalk.yellow('6. ') +
        'Dodaj epizod\n' +
        chalk.yellow('7. ') +
        'Dodaj utwor\n' +
        chalk.yellow('8. ') +
        'Dodaj ebook\n\n' +
        chalk.yellow('9. ') +
        'Modyfikuj film\n' +
        chalk.yellow('10. ') +
        'Modyfikuj epizod\n' +
        chalk.yellow('11. ') +
        'Modyfikuj utwor\n' +
        chalk.yellow('12. ') +
        'Modyfikuj ebook\n\n' +
        chalk.yellow('13. ') +
        'Usun film\n' +
        chalk.yellow('14. ') +
        'Usun epizod\n' +
        chalk.yellow('15. ') +
        'Usun utwor\n' +
        chalk.yellow('16. ') +
        'Usun ebook\n\n' +
        chalk.yellow('17. ') +
        'Wyswietl zawartosc biblioteki\n' +
        chalk.yellow('18. ') +
        'Wyswietl zasoby uzytkownika\n\n' +
        chalk.yellow('19. ') +
        'Wyswietl informacje o filmie\n' +
        chalk.yellow('20. ') +
        'Wyswietl informacje o epizodzie\n' +
        chalk.yellow('21. ') +
        'Wyswiel informacje o utworze\n' +
        chalk.yellow('22. ') +
        'Wyswietl informacje o ebooku\n\n' +
        chalk.yellow('23. ') +
        'Wyswietl album utworu\n\n' +
        chalk.yellow('24. ') +
        'Zapisz dane\n' +
        chalk.yellow('25. ') +
        'Wczytaj dane\n\n' +
        chalk.yellow('26. ') +
        'Wyswietl informacje o aktywnym uzytkowniku\n\n' +
        chalk.red('0. ') +
        'Zakoncz program\n'
    );
  }
}
