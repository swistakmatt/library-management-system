import { User } from 'users/User';
import * as readlineSync from 'readline-sync';
import { UserContainer } from 'users/UserContainer';
import { Ebook } from 'media/Ebook';
import { Song } from 'media/Song';
import { Episode } from 'media/Episode';
import { Movie } from 'media/Movie';

export class Menu {
  public registerUser(users: UserContainer): void {
    let admin: boolean;

    console.log('Rejestrowanie nowego uzytkownika');

    const username: string = readlineSync.question('Nazwa uzytkownika: ');

    const displayName: string = readlineSync.question('Nazwa wyswietlana: ');

    const password: string = readlineSync.question('Haslo: ');

    const buf: string = readlineSync.question('Administrator [T/N]: ');

    if (buf === 'T' || buf === 't') {
      admin = true;
    } else {
      admin = false;
    }

    users.addUser(username, password, displayName, admin);
  }

  public addMovie(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log('Dodawanie nowego filmu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const path: string = readlineSync.question('Sciezka: ');

    const buf: string = readlineSync.question('Publiczny [T/N]: ');

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public addEpisode(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log('Dodawanie nowego epizodu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const path: string = readlineSync.question('Sciezka: ');

    const buf: string = readlineSync.question('Publiczny [T/N]: ');

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public addSong(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log('Dodawanie nowego utworu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const path: string = readlineSync.question('Sciezka: ');

    const buf: string = readlineSync.question('Publiczny [T/N]: ');

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public addEbook(activeUser: User, library: LibraryContainer): void {
    let isPublic: boolean;

    console.log('Dodawanie nowego ebooka');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const path: string = readlineSync.question('Sciezka: ');

    const buf: string = readlineSync.question('Publiczny [T/N]: ');

    if (buf === 'T' || buf === 't') {
      isPublic = true;
    } else {
      isPublic = false;
    }

    library.addMedia(activeUser, title, releaseYear, path, isPublic, {});
  }

  public removeMovie(activeUser: User, library: LibraryContainer): void {
    console.log('Usuwanie filmu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    library.removeMedia(activeUser, library.getMovies(), title, releaseYear);
  }

  public removeEpisode(activeUser: User, library: LibraryContainer): void {
    console.log('Usuwanie epizodu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    library.removeMedia(activeUser, library.getEpisodes(), title, releaseYear);
  }

  public removeSong(activeUser: User, library: LibraryContainer): void {
    console.log('Usuwanie utworu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    library.removeMedia(activeUser, library.getSongs(), title, releaseYear);
  }

  public removeEbook(activeUser: User, library: LibraryContainer): void {
    console.log('Usuwanie ebooka');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    library.removeMedia(activeUser, library.getEbooks(), title, releaseYear);
  }

  public printAlbum(activeUser: User, library: LibraryContainer): void {
    console.log('Wyswietlanie albumu utworu');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const media = library.getMedia(activeUser, library.getSongs(), title, releaseYear) as Song;
    library.getAlbum(media).print();
  }

  public printMovie(activeUser: User, library: LibraryContainer): void {
    console.log('Wyswietlanie informacji o filmie');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const media = library.getMedia(activeUser, library.getMovies(), title, releaseYear) as Movie;
    media.print();
  }

  public printEpisode(activeUser: User, library: LibraryContainer): void {
    console.log('Wyswietlanie informacji o epizodzie');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const media = library.getMedia(activeUser, library.getEpisodes(), title, releaseYear) as Episode;
    media.print();
  }

  public printSong(activeUser: User, library: LibraryContainer): void {
    console.log('Wyswietlanie informacji o utworze');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const media = library.getMedia(activeUser, library.getSongs(), title, releaseYear) as Song;
    media.print();
  }

  public printEbook(activeUser: User, library: LibraryContainer): void {
    console.log('Wyswietlanie informacji o ebooku');

    const title: string = readlineSync.question('Tytul: ');

    const releaseYear: number = parseInt(readlineSync.question('Rok wydania: '));

    const media = library.getMedia(activeUser, library.getEbooks(), title, releaseYear) as Ebook;
    media.print();
  }

  public changeDisplayname(activeUser: User): void {
    console.log('Zmiana nazwy wyswietlania uzytkownika');

    const displayName: string = readlineSync.question('Nazwa wyswietlania: ');

    activeUser.setDisplayName(displayName);
  }

  public loginUser(users: UserContainer): User {
    console.log('Logowanie');

    const username: string = readlineSync.question('Nazwa uzytkownika: ');

    const password: string = readlineSync.question('Haslo: ');

    return users.getUser(username, password);
  }

  public changeAdmin(activeUser: User): void {
    let admin: boolean;

    console.log('Zmien uprawnienia uzytkownika');

    const buf: string = readlineSync.question('Administrator [Y/N]: ');

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    activeUser.setAdminStatus(admin);
  }

  public printMenuOptions(): void {
    console.log('Menu programu');

    console.log(
      '1. Dodaj uzytkownika\n' +
        '2. Zmien uzytkownika\n' +
        '3. Zmien nazwe wyswietlania\n' +
        '4. Zmien prawa administratora\n\n' +
        '5. Dodaj film\n' +
        '6. Dodaj epizod\n' +
        '7. Dodaj utwor\n' +
        '8. Dodaj ebook\n\n' +
        '9. Modyfikuj film\n' +
        '10. Modyfikuj epizod\n' +
        '11. Modyfikuj utwor\n' +
        '12 Modyfikuj ebook\n\n' +
        '13. Usun film\n' +
        '14. Usun epizod\n' +
        '15. Usun utwor\n' +
        '16. Usun ebook\n\n' +
        '17. Wyswietl zawartosc biblioteki\n' +
        '18. Wyswietl zasoby uzytkownika\n\n' +
        '19. Wyswietl informacje o filmie\n' +
        '20. Wyswietl infirmacje o epizodzie\n' +
        '21. Wyswiel informacje o utworze\n' +
        '22. Wyswietl informacje o ebooku\n\n' +
        '23. Wyswietl album utworu\n\n' +
        '24. Zapisz dane\n' +
        '25. Wczytaj dane\n\n' +
        '26. Wyswietl informacje o aktywnym uzytkowniku\n\n' +
        '0. Zakoncz program\n'
    );
  }
}
