import { Movie, MovieMetadata } from 'media/Movie';
import { MediaElementBuilder } from './MediaElementBuilder';

export class MovieBuilder extends MediaElementBuilder {
  private metadata: MovieMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: MovieMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: MovieMetadata): MovieBuilder {
    this.metadata = metadata;
    return this;
  }

  public getMetadata(): MovieMetadata {
    return this.metadata;
  }

  public build(): Movie {
    return new Movie(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
  }
}
