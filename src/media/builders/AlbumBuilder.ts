import { Album } from '../Album';
import { Song, SongMetadata } from '../Song';

export class AlbumBuilder {
  private metadata: SongMetadata;
  private tracks: Song[] = [];

  constructor();
  constructor(metadata: SongMetadata);
  constructor(
    metadata: SongMetadata = {
      album: 'Unknown Album',
      artist: 'Unknown Artist',
      length: 0,
      genre: 'Unknown Genre',
      releaseDate: '1970-01-01',
      trackNumber: 0,
    }
  ) {
    this.metadata = metadata;
  }

  public setMetadata(metadata: SongMetadata): this {
    this.metadata = metadata;
    return this;
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public addTrack(track: Song): this {
    this.tracks.push(track);
    return this;
  }

  public build(): Album {
    if (this.tracks.length === 0 || this.tracks[0] === undefined) {
      throw new Error('Album must have at least one track');
    }
    return new Album(this.tracks[0]);
  }
}
