import chalk from 'chalk';
import { MediaElement } from './MediaElement.js';

export interface SongMetadata {
  length: number;
  genre: string;
  releaseDate: string;
  artist: string;
  album: string;
  trackNumber: number;
}

export class Song extends MediaElement {
  public metadata: SongMetadata;

  constructor(
    title: string,
    releaseYear: number,
    path: string,
    owner: string,
    _public: boolean,
    metadata: SongMetadata
  ) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   ` + chalk.yellow(`Tytul: `) + `${this.title}`);
    console.log(`   ` + chalk.yellow(`Rok wydania: `) + `${this.releaseYear}`);
    console.log(`   ` + chalk.yellow(`Sciezka: `) + `${this.path}`);
    console.log(`   ` + chalk.yellow(`Wlasciciel: `) + `${this.getOwner()}`);
    console.log(
      `   ` +
        chalk.yellow(`Publiczny: `) +
        `${this.isPublic() ? 'true' : 'false'}`
    );

    console.log(
      `   ` +
        chalk.yellow(`Dlugosc: `) +
        `${Song.secondsToHours(this.metadata.length)}`
    );
    console.log(`   ` + chalk.yellow(`Gatunek: `) + `${this.metadata.genre}`);
    console.log(
      `   ` + chalk.yellow(`Data wydania: `) + `${this.metadata.releaseDate}`
    );

    console.log(
      `   ` + chalk.yellow(`Wykonawca: `) + `${this.metadata.artist}`
    );
    console.log(`   ` + chalk.yellow(`Album: `) + `${this.metadata.album}`);
    console.log(
      `   ` + chalk.yellow(`Numer utworu: `) + `${this.metadata.trackNumber}`
    );
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Biblioteka`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Muzyka `) +
        `-> ${this.metadata.artist} 
    -> ${this.metadata.album} -> ${this.metadata.trackNumber} -> ${this.title}`
    );
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
}
