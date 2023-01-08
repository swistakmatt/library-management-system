import { Episode, EpisodeMetadata } from 'media/Episode';
import { MediaElementBuilder } from './MediaElementBuilder';

export class EpisodeBuilder extends MediaElementBuilder {
  public metadata: EpisodeMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EpisodeMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: EpisodeMetadata): EpisodeBuilder {
    this.metadata = metadata;
    return this;
  }

  public build(): Episode {
    return new Episode(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
  }
}
