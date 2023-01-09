import { MediaElementBuilder } from './MediaElementBuilder';
import { Song, SongMetadata } from '../Song';

export class SongBuilder extends MediaElementBuilder {
  private metadata: SongMetadata;

  constructor();
  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: SongMetadata);
  constructor(
    title = 'Unknown Song',
    releaseYear?: number,
    path?: string,
    owner?: string,
    _public?: boolean,
    metadata: SongMetadata = {
      album: 'Unknown Album',
      artist: 'Unknown Artist',
      length: 0,
      genre: 'Unknown Genre',
      releaseDate: '1970-01-01',
      trackNumber: 0,
    }
  ) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: SongMetadata): this {
    this.metadata = metadata;
    return this;
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public build(): Song {
    return new Song(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
  }
}
