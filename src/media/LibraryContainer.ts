/* eslint-disable no-empty */
import { Album } from './Album';
import { Song, SongMetadata } from './Song';
import { Ebook, EbookMetadata } from './Ebook';
import { Movie, MovieMetadata } from './Movie';
import { Episode, EpisodeMetadata } from './Episode';
import { User } from '../users/User';
import { MediaElement } from './MediaElement';

interface MediaMetadata extends MovieMetadata, EpisodeMetadata, SongMetadata, EbookMetadata {}

export class LibraryContainer {
  private userMediaLimit: number;
  private userLibraryLimit: number;

  private movies: Movie[];
  private episodes: Episode[];
  private songs: Song[];
  private ebooks: Ebook[];

  constructor() {
    this.userMediaLimit = 0;
    this.userLibraryLimit = 0;
    this.movies = [];
    this.episodes = [];
    this.songs = [];
    this.ebooks = [];
  }

  public setLimits(mediaLimit: number, libraryLimit: number): void {
    this.userMediaLimit = mediaLimit;
    this.userLibraryLimit = libraryLimit;
  }

  public addMedia(user: User, title: string, releaseYear: number, path: string, publicAccess: boolean, metadata: MediaMetadata): void {
    if (Movie.isMovieMetadata(metadata)) {
      this.movies.forEach(function(movie) {
        if (movie.title === title && movie.releaseYear === releaseYear) {
          throw new Error(`Film znajduje sie juz w bibliotece!`);
        }
      });
      if (!user.isAdmin()) {
        if (this.countUserLibrary(user) >= this.userLibraryLimit || this.countUserMedia(user, this.movies) >= this.userMediaLimit) {
          throw new Error(`Przekroczono dopuszczalny limit elementow w bibliotece!`);
        }
      }
      const movie = new Movie(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
      this.movies.push(movie);
      console.log(`Dodano film [" ${title} "(" ${releaseYear} ")]\n`);
    } else if (Episode.isEpisodeMetadata(metadata)) {
      this.episodes.forEach(function(episode) {
        if (episode.title === title && episode.releaseYear === releaseYear) {
          throw new Error(`Odcinek znajduje sie juz w bibliotece!`);
        }
      });
      if (!user.isAdmin()) {
        if (this.countUserLibrary(user) >= this.userLibraryLimit || this.countUserMedia(user, this.episodes) >= this.userMediaLimit) {
          throw new Error(`Przekroczono dopuszczalny limit elementow w bibliotece!`);
        }
      }
      const episode = new Episode(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
      this.episodes.push(episode);
      console.log(`Dodano odcinek [" ${title} "(" ${releaseYear} ")]\n`);
    } else if (Song.isSongMetadata(metadata)) {
      this.songs.forEach(function(song) {
        if (song.title === title && song.releaseYear === releaseYear) {
          throw new Error(`Piosenka znajduje sie juz w bibliotece!`);
        }
      });
      if (!user.isAdmin()) {
        if (this.countUserLibrary(user) >= this.userLibraryLimit || this.countUserMedia(user, this.songs) >= this.userMediaLimit) {
          throw new Error(`Przekroczono dopuszczalny limit elementow w bibliotece!`);
        }
      }
      const song = new Song(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
      this.songs.push(song);
      console.log(`Dodano utwor [" ${title} "(" ${releaseYear} ")]\n`);
    } else if (Ebook.isEbookMetadata(metadata)) {
      this.ebooks.forEach(function(ebook) {
        if (ebook.title === title && ebook.releaseYear === releaseYear) {
          throw new Error(`Ebook znajduje sie juz w bibliotece!`);
        }
      });
      if (!user.isAdmin()) {
        if (this.countUserLibrary(user) >= this.userLibraryLimit || this.countUserMedia(user, this.ebooks) >= this.userMediaLimit) {
          throw new Error(`Przekroczono dopuszczalny limit elementow w bibliotece!`);
        }
      }
      const ebook = new Ebook(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
      this.ebooks.push(ebook);
      console.log(`Dodano ebook [" ${title} "(" ${releaseYear} ")]\n`);
    }
  }

  countUserMedia<T extends MediaElement>(user: User, mediaContainer: T[]): number {
    let counter = 0;

    for (const media of mediaContainer) {
      if (media.getOwner() === user.getUsername()) {
        counter++;
      }
    }

    return counter;
  }

  public countUserLibrary(user: User): number {
    return this.countUserMedia(user, this.movies) +
      this.countUserMedia(user, this.episodes) +
      this.countUserMedia(user, this.songs) +
      this.countUserMedia(user, this.ebooks);
  }

  public clear(): void {
    this.movies = [];
    this.episodes = [];
    this.songs = [];
    this.ebooks = [];
  }

  public print(user: User): void {
    console.log(`Ilosc elementow w bibliotece: ${this.countUserLibrary(user)}`);
    console.log(`Ilosc filmow: ${this.countUserMedia(user, this.movies)}`);
    for (const movie of this.movies) {
      if (!movie.isPublic()) {
        if (!user.isAdmin() && user.getUsername() !== movie.getOwner()) {
          continue;
        }
      }
      movie.print();
    }
    console.log(`Ilosc odcinkow: ${this.countUserMedia(user, this.episodes)}`);
    for (const episode of this.episodes) {
      if (!episode.isPublic()) {
        if (!user.isAdmin() && user.getUsername() !== episode.getOwner()) {
          continue;
        }
      }
      episode.print();
    }
    console.log(`Ilosc utworow: ${this.countUserMedia(user, this.songs)}`);
    for (const song of this.songs) {
      if (!song.isPublic()) {
        if (!user.isAdmin() && user.getUsername() !== song.getOwner()) {
          continue;
        }
      }
      song.print();
    }
    console.log(`Ilosc ebookow: ${this.countUserMedia(user, this.ebooks)}`);
    for (const ebook of this.ebooks) {
      if (!ebook.isPublic()) {
        if (!user.isAdmin() && user.getUsername() !== ebook.getOwner()) {
          continue;
        }
      }
      ebook.print();
    }
  }

  public printUserMedia(user: User): void {
    let counter = 0;
    console.log(`Ilosc elementow w bibliotece: ${this.countUserLibrary(user)}`);
    console.log(`Ilosc filmow: ${this.countUserMedia(user, this.movies)}`);
    for (const movie of this.movies) {
      if (movie.getOwner() === user.getUsername()) {
        movie.print();
        counter += 1;
      }
    }
    console.log(`Ilosc odcinkow: ${this.countUserMedia(user, this.episodes)}`);
    for (const episode of this.episodes) {
      if (episode.getOwner() === user.getUsername()) {
        episode.print();
        counter += 1;
      }
    }
    console.log(`Ilosc utworow: ${this.countUserMedia(user, this.songs)}`);
    for (const song of this.songs) {
      if (song.getOwner() === user.getUsername()) {
        song.print();
        counter += 1;
      }
    }
    console.log(`Ilosc ebookow: ${this.countUserMedia(user, this.ebooks)}`);
    for (const ebook of this.ebooks) {
      if (ebook.getOwner() === user.getUsername()) {
        ebook.print();
        counter += 1;
      }
    }
    if (counter === 0) {
      console.log(`Uzytkownik nie posiada elementow w bibliotece!`);
    } else {
      console.log(`Laczna ilosc multimediow dla [${user.getDisplayName()}]: ${counter}`);
    }
  }

  public removeMedia(user: User, mediaContainer: MediaElement[], title: string, releaseYear: number): void {
    let index = -1;
    for (let i = 0; i < mediaContainer.length; i++) {
      if (typeof mediaContainer[i] === 'string' && mediaContainer[i] !== undefined) {
        if (mediaContainer[i]?.title === title && mediaContainer[i]?.releaseYear === releaseYear) {
          index = i;
          break;
        }
      }
    }

    for (const media of mediaContainer) {
      if (media.title === title && media.releaseYear === releaseYear) {
        index = mediaContainer.indexOf(media);
        break;
      }
    }

    if (index === -1) {
      throw new Error(`Element o podanych parametrach nie istnieje!`);
    }

    if (!user.isAdmin() && user.getUsername() !== mediaContainer[index].getOwner()) {
      throw new Error(`Nie masz uprawnien do usuniecia tego elementu!`);
    }

    mediaContainer.splice(index, 1);
  }

  public getAlbum(song: Song): Album {
    const album = new Album(song);

    for (const song of this.songs) {
      if (song.getMetadata().album === album.getMetadata().album && song.metadata.artist === album.getMetadata().artist) {
        album.addSong(song);
      }
    }

    return album;
  }

  public editMetadata<T extends MediaElement, M>(user: User, mediaContainer: T[], title: string, releaseYear: number, metadata: M): void {
    try {
      for (let i = 0; i < mediaContainer.length; i++) {
        if (mediaContainer[i].title === title && mediaContainer[i].releaseYear === releaseYear) {
          if (mediaContainer[i].getOwner() !== user.getUsername() && !user.isAdmin()) {
            throw new Error('Brak wymaganych uprawnien do zarzadzania tym zasobem!');
          }
          mediaContainer[i].setMetadata(metadata);
          return;
        }
      }
      throw new Error('Nie znaleziono elementu w bibliotece!');
    } catch (err) {
      console.error(err);
    }
  }
}
