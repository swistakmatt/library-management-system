import { MediaElementBuilder } from './MediaElementBuilder';
import { Song, SongMetadata } from 'media/Song';

export class SongBuilder extends MediaElementBuilder {
  private metadata: SongMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: SongMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: SongMetadata): SongBuilder {
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
