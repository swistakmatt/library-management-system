import { Album } from 'media/Album';
import { Song, SongMetadata } from 'media/Song';

export class AlbumBuilder {
  private metadata: SongMetadata;
  private tracks: Song[] = [];

  constructor(_public: boolean, metadata: SongMetadata) {
    this.metadata = metadata;
  }

  public setMetadata(metadata: SongMetadata): AlbumBuilder {
    this.metadata = metadata;
    return this;
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public addTrack(track: Song): AlbumBuilder {
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
