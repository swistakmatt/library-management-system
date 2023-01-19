import { Movie, MovieMetadata } from '../Movie';
import { MediaElementBuilder } from './MediaElementBuilder';

export class MovieBuilder extends MediaElementBuilder {
  private metadata: MovieMetadata;

  constructor();
  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: MovieMetadata);
  constructor(
    title = 'Unknown Movie',
    releaseYear?: number,
    path?: string,
    owner?: string,
    _public?: boolean,
    metadata: MovieMetadata = {
      cast: {},
      genre: 'Unknown Genre',
      length: 0,
      releaseDate: '1970-01-01',
    }
  ) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: MovieMetadata): this {
    this.metadata = metadata;
    return this;
  }

  public getMetadata(): MovieMetadata {
    return this.metadata;
  }

  public build(): Movie {
    const movie = new Movie(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
    this.softForceId(movie);

    return movie;
  }
}
