/* eslint-disable no-empty */
import { Album } from './Album.js';
import { Song, SongMetadata } from './Song.js';
import { Ebook, EbookMetadata } from './Ebook.js';
import { Movie, MovieMetadata } from './Movie.js';
import { Episode, EpisodeMetadata } from './Episode.js';
import { User } from '../users/User.js';
import { BaseMetadata, MediaElement } from './MediaElement.js';
import chalk from 'chalk';
import { MediaRepositoryProxy } from './repositories/MediaRepositoryProxy.js';
import { MovieRepository } from './repositories/MovieRepository.js';
import { SongRepository } from './repositories/SongRepository.js';
import { EbookRepository } from './repositories/EbookRepository.js';
import { EpisodeRepository } from './repositories/EpisodeRepository.js';
import { RepositoryInterface } from './repositories/Repository.js';

type UnionKeys<T> = T extends T ? keyof T : never;

type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;

type OneOf<T extends unknown[]> = {
  [K in keyof T]: Expand<T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>>;
}[number];

export type MediaMetadata = OneOf<[MovieMetadata, EpisodeMetadata, SongMetadata, EbookMetadata]>;

type AddMedia<T extends MediaMetadata = MediaMetadata> = (
  user: User,
  title: string,
  releaseYear: number,
  path: string,
  publicAccess: boolean,
  metadata: T,
) => Promise<void>;

export class LibraryContainer {
  private userMediaLimit: number;
  private userLibraryLimit: number;

  public movies: RepositoryInterface<Movie>;
  public episodes: RepositoryInterface<Episode>;
  public songs: RepositoryInterface<Song>;
  public ebooks: RepositoryInterface<Ebook>;

  constructor() {
    this.userMediaLimit = 0;
    this.userLibraryLimit = 0;

    this.movies = new MediaRepositoryProxy(new MovieRepository());
    this.episodes = new MediaRepositoryProxy(new EpisodeRepository());
    this.songs = new MediaRepositoryProxy(new SongRepository());
    this.ebooks = new MediaRepositoryProxy(new EbookRepository());
  }

  public setLimits(mediaLimit: number, libraryLimit: number): void {
    this.userMediaLimit = mediaLimit;
    this.userLibraryLimit = libraryLimit;
  }

  public addMedia: AddMedia = async (user, title, releaseYear, path, publicAccess, metadata) => {
    if (Movie.isMovieMetadata(metadata)) await this.addMovie(user, title, releaseYear, path, publicAccess, metadata);
    else if (Episode.isEpisodeMetadata(metadata)) await this.addEpisode(user, title, releaseYear, path, publicAccess, metadata);
    else if (Song.isSongMetadata(metadata)) await this.addSong(user, title, releaseYear, path, publicAccess, metadata);
    else if (Ebook.isEbookMetadata(metadata)) await this.addEbook(user, title, releaseYear, path, publicAccess, metadata);
    else throw new Error('Unknown media type');
  };

  private addMovie: AddMedia<MovieMetadata> = async (user, title, releaseYear, path, publicAccess, metadata) => {
    if (await this.hasMedia(this.movies, title, releaseYear)) {
      throw new Error('Movie already exists in library!');
    }

    await this.checkUserMediaLimit(user, this.movies);

    // TODO: Use abstract factory
    const movie = new Movie(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
    await this.movies.set(movie);

    console.log(chalk.green('Added movie'), `[" ${title} "(" ${releaseYear} ")]\n`);
  };

  private addEpisode: AddMedia<EpisodeMetadata> = async (user, title, releaseYear, path, publicAccess, metadata) => {
    if (await this.hasMedia(this.episodes, title, releaseYear)) {
      throw new Error('Episode already exists in library!');
    }

    await this.checkUserMediaLimit(user, this.episodes);

    const episode = new Episode(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
    await this.episodes.set(episode);

    console.log(chalk.green('Added episode'), `[" ${title} "(" ${releaseYear} ")]\n`);
  };

  private addSong: AddMedia<SongMetadata> = async (user, title, releaseYear, path, publicAccess, metadata) => {
    if (await this.hasMedia(this.songs, title, releaseYear)) {
      throw new Error('Song already exists in library!');
    }

    await this.checkUserMediaLimit(user, this.songs);

    const song = new Song(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
    await this.songs.set(song);

    console.log(chalk.green('Added song'), `[" ${title} "(" ${releaseYear} ")]\n`);
  };

  private addEbook: AddMedia<EbookMetadata> = async (user, title, releaseYear, path, publicAccess, metadata) => {
    if (await this.hasMedia(this.ebooks, title, releaseYear)) {
      throw new Error('Ebook already exists in library!');
    }

    await this.checkUserMediaLimit(user, this.ebooks);

    const ebook = new Ebook(title, releaseYear, path, user.getUsername(), publicAccess, metadata);
    await this.ebooks.set(ebook);

    console.log(chalk.green('Added ebook'), `[" ${title} "(" ${releaseYear} ")]\n`);
  };

  public async hasMedia<T extends MediaElement>(repository: RepositoryInterface<T>, title: string, releaseYear: number): Promise<boolean> {
    const media = await repository.getAll();

    for (const element of media) {
      if (element.title === title && element.releaseYear === releaseYear) {
        return true;
      }
    }

    return false;
  }

  public async getMedia<T extends MediaElement>(user: User, repository: RepositoryInterface<T>, title: string, releaseYear: number): Promise<T> {
    const media = await repository.getAll();

    const target = media.find((element) => element.title === title && element.releaseYear === releaseYear);
    if (!target) throw new Error('Media not found!');

    if (!target.isPublic() && target.getOwner() !== user.getUsername()) {
      throw new Error('Media not found!');
    }

    return target;
  }

  private async checkUserMediaLimit<T extends MediaElement>(user: User, repository: RepositoryInterface<T>): Promise<void> {
    if (user.isAdmin()) return;

    if (
      (await this.countUserLibrary(user)) >= this.userLibraryLimit ||
      (await this.countUserMedia(user, repository)) >= this.userMediaLimit
    ) {
      throw new Error('Exceeded the maximum number of elements in the library!');
    }
  }

  private async countUserMedia<T extends MediaElement>(user: User, repository: RepositoryInterface<T>): Promise<number> {
    let counter = 0;

    for (const media of await repository.getAll()) {
      if (media.getOwner() === user.getUsername()) {
        counter++;
      }
    }

    return counter;
  }

  public async countUserLibrary(user: User): Promise<number> {
    const stats = await Promise.all([
      this.countUserMedia(user, this.movies),
      this.countUserMedia(user, this.episodes),
      this.countUserMedia(user, this.songs),
      this.countUserMedia(user, this.ebooks),
    ]);

    return stats.reduce((a, b) => a + b, 0);
  }

  private async printPublicRepository<T extends MediaElement>(user: User, repository: RepositoryInterface<T>): Promise<void> {
    for await (const media of repository) {
      if (media.isPublic() || user.isAdmin() || user.getUsername() !== media.getOwner()) {
        media.print();
      }
    }
  }

  public async clear(): Promise<void> {
    for await (const media of this.movies) {
      await this.movies.delete(media);
    }

    for await (const media of this.episodes) {
      await this.episodes.delete(media);
    }

    for await (const media of this.songs) {
      await this.songs.delete(media);
    }

    for await (const media of this.ebooks) {
      await this.ebooks.delete(media);
    }
  }

  public async print(user: User): Promise<void> {
    console.log(chalk.yellow('Number of elements in the library:'), await this.countUserLibrary(user));

    console.log(chalk.yellow('Movies:'), await this.countUserMedia(user, this.movies));
    await this.printPublicRepository(user, this.movies);

    console.log(chalk.yellow('Episodes:'), await this.countUserMedia(user, this.episodes));
    await this.printPublicRepository(user, this.episodes);

    console.log(chalk.yellow('Songs:'), await this.countUserMedia(user, this.songs));
    await this.printPublicRepository(user, this.songs);

    console.log(chalk.yellow('Ebooks:'), await this.countUserMedia(user, this.ebooks));
    await this.printPublicRepository(user, this.ebooks);
  }

  public async printUserMedia(user: User): Promise<void> {
    let counter = 0;

    console.log(chalk.yellow('Number of elements in the library:'), this.countUserLibrary(user));
    console.log(chalk.yellow('Movies:'), await this.countUserMedia(user, this.movies));
    for await (const movie of this.movies) {
      if (movie.getOwner() === user.getUsername()) {
        movie.print();
        counter += 1;
      }
    }

    console.log(chalk.yellow('Episodes:'), await this.countUserMedia(user, this.episodes));
    for await (const episode of this.episodes) {
      if (episode.getOwner() === user.getUsername()) {
        episode.print();
        counter += 1;
      }
    }

    console.log(chalk.yellow('Songs:'), await this.countUserMedia(user, this.songs));
    for await (const song of this.songs) {
      if (song.getOwner() === user.getUsername()) {
        song.print();
        counter += 1;
      }
    }

    console.log(chalk.yellow('Ebooks:'), await this.countUserMedia(user, this.ebooks));
    for await (const ebook of this.ebooks) {
      if (ebook.getOwner() === user.getUsername()) {
        ebook.print();
        counter += 1;
      }
    }

    if (counter === 0) {
      console.log('User does not own any elements in the library!');
    } else {
      console.log(chalk.yellow('Total number of elements owned by'), `[${user.getDisplayName()}]: ${counter}`);
    }
  }

  public async removeMedia<T extends MediaElement>(
    user: User,
    repository: RepositoryInterface<T>,
    title: string,
    releaseYear: number,
  ): Promise<void> {
    const media = await repository.getAll();

    const target = media.find((element) => element.title === title && element.releaseYear === releaseYear);
    if (target === undefined) throw new Error('Specified element does not exist!');

    if (!user.isAdmin() && user.getUsername() !== target.getOwner()) {
      throw new Error('Insufficient permissions to remove this element!');
    }

    await repository.delete(target);
  }

  public async getAlbum(song: Song): Promise<Album> {
    const album = new Album(song);

    for await (const song of this.songs) {
      if (song.getMetadata().album === album.getMetadata().album && song.metadata.artist === album.getMetadata().artist) {
        album.addSong(song);
      }
    }

    return album;
  }

  public async editMetadata<T extends MediaElement, M extends MediaMetadata>(
    user: User,
    repository: RepositoryInterface<T>,
    title: string,
    releaseYear: number,
    metadata: M & BaseMetadata,
  ): Promise<void> {
    const media = await repository.getAll();

    const target = media.find((element) => element.title === title && element.releaseYear === releaseYear);
    if (target === undefined) throw new Error('Specified element does not exist!');

    if (!user.isAdmin() && user.getUsername() !== target.getOwner()) {
      throw new Error('Insufficient permissions to edit this element!');
    }

    target.setBaseMetadata({
      title: metadata.title,
      releaseYear: metadata.releaseYear,
      path: metadata.path,
      owner: metadata.owner,
      _public: metadata._public,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title: _, releaseYear: __, path: ___, owner: ____, _public: _____, ...rest } = metadata;
    target.setMetadata(rest);

    await repository.update(target);
  }
}
