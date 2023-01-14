import { Episode, EpisodeMetadata } from '../Episode.js';
import { MediaElementBuilder } from './MediaElementBuilder.js';

export class EpisodeBuilder extends MediaElementBuilder {
  public metadata: EpisodeMetadata;

  constructor();
  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EpisodeMetadata);
  constructor(
    title = 'Unknown Song',
    releaseYear?: number,
    path?: string,
    owner?: string,
    _public?: boolean,
    metadata: EpisodeMetadata = {
      cast: {},
      genre: 'Unknown Genre',
      length: 0,
      releaseDate: '1970-01-01',
      seasonNumber: 0,
      episodeNumber: 0,
      series: 'Unknown Series',
    }
  ) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: EpisodeMetadata): this {
    this.metadata = metadata;
    return this;
  }

  public build(): Episode {
    const episode = new Episode(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
    this.softForceId(episode);

    return episode;
  }
}
