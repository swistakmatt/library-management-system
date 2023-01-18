import { User } from '../users/User.js';
import * as readlineSync from 'readline-sync';
import { UserContainer } from '../users/UserContainer.js';
import { LibraryContainer } from '../media/LibraryContainer.js';
import chalk from 'chalk';
import { Movie, MovieMetadata } from '../media/Movie.js';
import { EpisodeMetadata } from '../media/Episode.js';
import { SongMetadata } from '../media/Song.js';
import { EbookMetadata } from '../media/Ebook.js';
import { Command } from './Command.js';
import { BaseMetadata } from '../media/MediaElement.js';
import { UpdateEbookCommand, UpdateEpisodeCommand, UpdateMovieCommand, UpdateSongCommand } from './UpdateMediaCommand.js';
import util from 'util';


export class Menu {
  private static commands: Command[] = [];
  private static redo: Command[] = [];

  public static async registerUser(users: UserContainer): Promise<void> {
    let admin: boolean;

    console.log(chalk.yellow('Registering a new user'));

    const username: string = readlineSync.question(chalk.yellow('Username: '));

    const displayName: string = readlineSync.question(chalk.yellow('Display name: '));

    const password: string = readlineSync.question(chalk.yellow('Password: '));

    const buf: string = readlineSync.question(chalk.yellow('Admin [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    await users.addUser(username, password, displayName, admin);
  }

  public static async addMovie(activeUser: User, library: LibraryContainer): Promise<void> {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(chalk.yellow('Public [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }


    const metadata: MovieMetadata = {
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      cast: {},
    };

    await library.addMedia(activeUser, title, releaseYear, path, isPublic, metadata);
  }

  public static async addEpisode(activeUser: User, library: LibraryContainer): Promise<void> {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(chalk.yellow('Public [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }


    const metadata: EpisodeMetadata = {
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      cast: {},
      episodeNumber: parseInt(readlineSync.question(chalk.yellow('Episode number: '))),
      seasonNumber: parseInt(readlineSync.question(chalk.yellow('Season number: '))),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      series: readlineSync.question(chalk.yellow('Series: ')),
    };

    await library.addMedia(activeUser, title, releaseYear, path, isPublic, metadata);
  }

  public static async addSong(activeUser: User, library: LibraryContainer): Promise<void> {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(chalk.yellow('Public [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }


    const metadata: SongMetadata = {
      album: readlineSync.question(chalk.yellow('Album: ')),
      artist: readlineSync.question(chalk.yellow('Artist: ')),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      trackNumber: parseInt(readlineSync.question(chalk.yellow('Track number: '))),
    };

    await library.addMedia(activeUser, title, releaseYear, path, isPublic, metadata);
  }

  public static async addEbook(activeUser: User, library: LibraryContainer): Promise<void> {
    let isPublic: boolean;

    console.log(chalk.yellow('Adding new ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const path: string = readlineSync.question(chalk.yellow('Path: '));

    const buf: string = readlineSync.question(chalk.yellow('Public [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      isPublic = true;
    } else {
      isPublic = false;
    }


    const metadata: EbookMetadata = {
      author: readlineSync.question(chalk.yellow('Author: ')),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      numberOfPages: parseInt(readlineSync.question(chalk.yellow('Number of pages: '))),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
    };

    await library.addMedia(activeUser, title, releaseYear, path, isPublic, metadata);
  }

  public static async modifyMovie(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Modifying movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));
    const releaseYear = parseInt(readlineSync.question(chalk.yellow('Release year: ')));


    const movie = await library.getMedia(activeUser, library.movies, title, releaseYear);

    const metadata: MovieMetadata = {
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      cast: {},
    };

    const command = new UpdateMovieCommand(activeUser, library, movie.getBaseMetadata(), metadata);
    Menu.commands.push(command);

    await command.execute();
  }

  public static async modifyEpisode(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Modifying episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));
    const releaseYear = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const episode = await library.getMedia(activeUser, library.episodes, title, releaseYear);

    const metadata: EpisodeMetadata = {
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      cast: {},
      episodeNumber: parseInt(readlineSync.question(chalk.yellow('Episode number: '))),
      seasonNumber: parseInt(readlineSync.question(chalk.yellow('Season number: '))),
      series: readlineSync.question(chalk.yellow('Series: ')),
    };

    const command = new UpdateEpisodeCommand(activeUser, library, episode.getBaseMetadata(), metadata);
    Menu.commands.push(command);

    await command.execute();
  }

  public static async modifySong(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Modifying song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));
    const releaseYear = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const song = await library.getMedia(activeUser, library.songs, title, releaseYear);

    const metadata: SongMetadata = {
      length: parseInt(readlineSync.question(chalk.yellow('Length: '))),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
      artist: readlineSync.question(chalk.yellow('Artist: ')),
      album: readlineSync.question(chalk.yellow('Album: ')),
      trackNumber: parseInt(readlineSync.question(chalk.yellow('Track number: '))),
    };

    const command = new UpdateSongCommand(activeUser, library, song.getBaseMetadata(), metadata);
    Menu.commands.push(command);

    await command.execute();
  }

  public static async modifyEbook(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Modifying ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));
    const releaseYear = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const ebook = await library.getMedia(activeUser, library.ebooks, title, releaseYear);

    const metadata: EbookMetadata = {
      author: readlineSync.question(chalk.yellow('Author: ')),
      genre: readlineSync.question(chalk.yellow('Genre: ')),
      numberOfPages: parseInt(readlineSync.question(chalk.yellow('Number of pages: '))),
      releaseDate: readlineSync.question(chalk.yellow('Release date: ')),
    };

    const command = new UpdateEbookCommand(activeUser, library, ebook.getBaseMetadata(), metadata);
    Menu.commands.push(command);

    await command.execute();
  }

  public static async removeMovie(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Removing movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    await library.removeMedia(activeUser, library.movies, title, releaseYear);

    Menu.commands = [];
    Menu.redo = [];
  }

  public static async removeEpisode(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Removing episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    await library.removeMedia(activeUser, library.episodes, title, releaseYear);

    Menu.commands = [];
    Menu.redo = [];
  }

  public static async removeSong(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Removing song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    await library.removeMedia(activeUser, library.songs, title, releaseYear);

    Menu.commands = [];
    Menu.redo = [];
  }

  public static async removeEbook(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Removing ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    await library.removeMedia(activeUser, library.ebooks, title, releaseYear);

    Menu.commands = [];
    Menu.redo = [];
  }

  public static async undo(activeUser: User, library: LibraryContainer): Promise<void> {
    if (Menu.commands.length > 0) {
      const command = Menu.commands.pop();
      if (command === undefined) return;
      await command.undo();
      Menu.redo.push(command);
    }
  }

  public static async undoUndo(activeUser: User, library: LibraryContainer): Promise<void> {
    if (Menu.redo.length > 0) {
      const command = Menu.redo.pop();
      if (command === undefined) return;
      await command.execute();
      Menu.commands.push(command);
    }
  }

  public static async printAlbum(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Printing album'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const media = await library.getMedia(activeUser, library.songs, title, releaseYear);
    (await library.getAlbum(media)).print();
  }

  public static async printMovie(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Printing information about movie'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const media = await library.getMedia(activeUser, library.movies, title, releaseYear);
    media.print();
  }

  public static async printEpisode(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Printing information about episode'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const media = await library.getMedia(activeUser, library.episodes, title, releaseYear);
    media.print();
  }

  public static async printSong(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Printing information about song'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const media = await library.getMedia(activeUser, library.songs, title, releaseYear);
    media.print();
  }

  public static async printEbook(activeUser: User, library: LibraryContainer): Promise<void> {
    console.log(chalk.yellow('Printing information about ebook'));

    const title: string = readlineSync.question(chalk.yellow('Title: '));

    const releaseYear: number = parseInt(readlineSync.question(chalk.yellow('Release year: ')));

    const media = await library.getMedia(activeUser, library.ebooks, title, releaseYear);
    media.print();
  }

  public static changeDisplayname(activeUser: User): void {
    console.log(chalk.yellow('Changing display name'));

    const displayName: string = readlineSync.question(chalk.yellow('Display name: '));

    activeUser.setDisplayName(displayName);
  }

  public static async loginUser(users: UserContainer): Promise<User> {
    console.log(chalk.yellow('Logging in'));

    const username: string = readlineSync.question(chalk.yellow('Username: '));

    const password: string = readlineSync.question(chalk.yellow('Password: '));

    return users.getUser(username, password);
  }

  public static changeAdmin(activeUser: User): void {
    let admin: boolean;

    console.log(chalk.yellow('Changing user permissions'));

    const buf: string = readlineSync.question(chalk.yellow('Admin [Y/N]: '));

    if (buf === 'Y' || buf === 'y') {
      admin = true;
    } else {
      admin = false;
    }

    activeUser.setAdmin(admin);
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
        chalk.yellow('24. ') +
        'Undo last modify command\n' +
        chalk.yellow('25. ') +
        'Redo last modify command\n' +
        chalk.yellow('26. ') +
        'Print informations about the active user\n\n' +
        chalk.red('0. ') +
        'End program\n',
    );
  }
}
