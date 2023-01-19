import chalk from 'chalk';
import { MediaElement } from './MediaElement';
import { MediaMemento, MediaMementoOriginator, Memento } from './repositories/MediaMemento';

export interface SongMetadata {
  length: number;
  genre: string;
  releaseDate: string;
  artist: string;
  album: string;
  trackNumber: number;
}

export class Song extends MediaElement implements MediaMementoOriginator<SongMetadata> {
  public metadata: SongMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: SongMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   ` + chalk.yellow(`Title: `) + `${this.title}`);
    console.log(`   ` + chalk.yellow(`Release year: `) + `${this.releaseYear}`);
    console.log(`   ` + chalk.yellow(`Path: `) + `${this.path}`);
    console.log(`   ` + chalk.yellow(`Owner: `) + `${this.getOwner()}`);
    console.log(`   ` + chalk.yellow(`Public: `) + `${this.isPublic() ? 'true' : 'false'}`);

    console.log(`   ` + chalk.yellow(`Length: `) + `${Song.secondsToHours(this.metadata.length)}`);
    console.log(`   ` + chalk.yellow(`Genre: `) + `${this.metadata.genre}`);
    console.log(`   ` + chalk.yellow(`Release date: `) + `${this.metadata.releaseDate}`);

    console.log(`   ` + chalk.yellow(`Artist: `) + `${this.metadata.artist}`);
    console.log(`   ` + chalk.yellow(`Album: `) + `${this.metadata.album}`);
    console.log(`   ` + chalk.yellow(`Track number: `) + `${this.metadata.trackNumber}`);
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Library`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Music `) +
        `-> ${this.metadata.artist} 
    -> ${this.metadata.album} -> ${this.metadata.trackNumber} -> ${this.title}`,
    );
  }

  public setMetadata(metadata: SongMetadata): void {
    this.metadata = metadata;
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public static isSongMetadata(obj: unknown): obj is SongMetadata {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      'length' in obj &&
      typeof obj.length === 'number' &&
      'genre' in obj &&
      typeof obj.genre === 'string' &&
      'releaseDate' in obj &&
      typeof obj.releaseDate === 'string' &&
      'artist' in obj &&
      typeof obj.artist === 'string' &&
      'album' in obj &&
      typeof obj.album === 'string' &&
      'trackNumber' in obj &&
      typeof obj.trackNumber === 'number'
    );
  }

  public save(): Memento<SongMetadata> {
    const memento = new MediaMemento({
      ...this.getBaseMetadata(),
      ...this.metadata,
    });

    return memento;
  }

  public restore(memento: Memento<SongMetadata>): void {
    const state = memento.getState();

    this.setBaseMetadata({
      title: state.title,
      releaseYear: state.releaseYear,
      path: state.path,
      owner: state.owner,
      _public: state._public,
    });

    this.setMetadata({
      length: state.length,
      genre: state.genre,
      releaseDate: state.releaseDate,
      artist: state.artist,
      album: state.album,
      trackNumber: state.trackNumber,
    });
  }
}
