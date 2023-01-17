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


export class CreateMediaCommand<T extends MediaMetadata, U extends MediaElement & MediaMementoOriginator<T>> implements Command {
  private media?: U;
  private memento?: Memento<T>;

  constructor(
    private user: User,
    private container: LibraryContainer,
    private repository: RepositoryInterface<U>,
    private baseMetadata: BaseMetadata,
    private metadata: T
  ) { }

  public async execute(): Promise<void> {
    const { title, releaseYear, path, _public } = this.baseMetadata;
    await this.container.addMedia(this.user, title, releaseYear, path, _public, this.metadata);

    const media = await this.container.getMedia(this.user, this.repository, this.baseMetadata.title, this.baseMetadata.releaseYear);
    this.media = media;

    this.memento = media.save();
  }

  public async undo(): Promise<void> {
    // if (this.media && this.memento) {
    //   this.media.restore(this.memento);
    //   await this.repository.delete(this.media);
    // }
  }
}

export class CreateEbookCommand extends CreateMediaCommand<EbookMetadata, Ebook> {
  constructor(user: User, container: LibraryContainer, baseMetadata: BaseMetadata, metadata: EbookMetadata) {
    super(user, container, container.ebooks, baseMetadata, metadata);
  }
}

export class CreateEpisodeCommand extends CreateMediaCommand<EpisodeMetadata, Episode> {
  constructor(user: User, container: LibraryContainer, baseMetadata: BaseMetadata, metadata: EpisodeMetadata) {
    super(user, container, container.episodes, baseMetadata, metadata);
  }
}

export class CreateSongCommand extends CreateMediaCommand<SongMetadata, Song> {
  constructor(user: User, container: LibraryContainer, baseMetadata: BaseMetadata, metadata: SongMetadata) {
    super(user, container, container.songs, baseMetadata, metadata);
  }
}

export class CreateMovieCommand extends CreateMediaCommand<MovieMetadata, Movie> {
  constructor(user: User, container: LibraryContainer, baseMetadata: BaseMetadata, metadata: MovieMetadata) {
    super(user, container, container.movies, baseMetadata, metadata);
  }
}
