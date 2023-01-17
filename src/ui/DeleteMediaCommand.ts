import { Ebook, EbookMetadata } from '../media/Ebook.js';
import { Episode, EpisodeMetadata } from '../media/Episode.js';
import { LibraryContainer, MediaMetadata } from '../media/LibraryContainer.js';
import { BaseMetadata, MediaElement } from '../media/MediaElement.js';
import { Movie, MovieMetadata } from '../media/Movie.js';
import { MediaMementoOriginator, Memento } from '../media/repositories/MediaMemento.js';
import { RepositoryInterface } from '../media/repositories/Repository.js';
import { Song, SongMetadata } from '../media/Song.js';
import { User } from '../users/User.js';
import { Command } from './Command.js';


export class DeleteMediaCommand<T extends MediaMetadata, U extends MediaElement & MediaMementoOriginator<T>> implements Command {
  private media?: U;
  private memento?: Memento<T>;

  constructor(
    private user: User,
    private container: LibraryContainer,
    private repository: RepositoryInterface<U>,
    private title: string,
    private releaseYear: number
  ) { }

  public async execute(): Promise<void> {
    const media = await this.container.getMedia(this.user, this.repository, this.title, this.releaseYear);
    await this.container.removeMedia(this.user, this.repository, this.title, this.releaseYear);

    this.media = media;

    this.memento = media.save();
  }

  public async undo(): Promise<void> {
    // if (this.media && this.memento) {
    //   this.media.restore(this.memento);
    //   await this.repository.set(this.media);
    // }
  }
}

export class DeleteEbookCommand extends DeleteMediaCommand<EbookMetadata, Ebook> {
  constructor(user: User, container: LibraryContainer, title: string, releaseYear: number) {
    super(user, container, container.ebooks, title, releaseYear);
  }
}

export class DeleteEpisodeCommand extends DeleteMediaCommand<EpisodeMetadata, Episode> {
  constructor(user: User, container: LibraryContainer, title: string, releaseYear: number) {
    super(user, container, container.episodes, title, releaseYear);
  }
}

export class DeleteSongCommand extends DeleteMediaCommand<SongMetadata, Song> {
  constructor(user: User, container: LibraryContainer, title: string, releaseYear: number) {
    super(user, container, container.songs, title, releaseYear);
  }
}

export class DeleteMovieCommand extends DeleteMediaCommand<MovieMetadata, Movie> {
  constructor(user: User, container: LibraryContainer, title: string, releaseYear: number) {
    super(user, container, container.movies, title, releaseYear);
  }
}
