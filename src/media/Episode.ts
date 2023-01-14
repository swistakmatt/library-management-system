import chalk from 'chalk';
import { MediaElement } from './MediaElement.js';

export interface EpisodeMetadata {
  length: number;
  genre: string;
  releaseDate: string;
  series: string;
  episodeNumber: number;
  seasonNumber: number;
  cast: {
    [actor: string]: string;
  };
}

export class Episode extends MediaElement {
  public metadata: EpisodeMetadata;

  constructor(
    title: string,
    releaseYear: number,
    path: string,
    owner: string,
    _public: boolean,
    metadata: EpisodeMetadata
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
        `${Episode.secondsToHours(this.metadata.length)}`
    );
    console.log(`   ` + chalk.yellow(`Gatunek: `) + `${this.metadata.genre}`);
    console.log(
      `   ` + chalk.yellow(`Data wydania: `) + `${this.metadata.releaseDate}`
    );
    console.log(
      `   ` + chalk.yellow(`Nazwa serialu: `) + `${this.metadata.series}`
    );
    console.log(
      `   ` + chalk.yellow(`Numer odcinka: `) + `${this.metadata.episodeNumber}`
    );
    console.log(
      `   ` + chalk.yellow(`Numer sezonu: `) + `${this.metadata.seasonNumber}`
    );
    console.log('   ' + chalk.yellow('Obsada: '));
    for (const [actor, role] of Object.entries(this.metadata.cast)) {
      console.log(`      ${actor}: ${role}`);
    }
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Biblioteka`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Seriale `) +
        `-> ${this.metadata.series} 
    -> ` +
        chalk.yellow(`Sezon `) +
        `${this.metadata.seasonNumber} -> ` +
        chalk.yellow(`Epizod `) +
        `${this.metadata.episodeNumber} -> ${this.title}(${this.releaseYear})`
    );
  }

  public getMetadata(): EpisodeMetadata {
    return this.metadata;
  }

  public static isEpisodeMetadata(obj: unknown): obj is EpisodeMetadata {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      'length' in obj &&
      typeof obj.length === 'number' &&
      'genre' in obj &&
      typeof obj.genre === 'string' &&
      'releaseDate' in obj &&
      typeof obj.releaseDate === 'string' &&
      'series' in obj &&
      typeof obj.series === 'string' &&
      'episodeNumber' in obj &&
      typeof obj.episodeNumber === 'number' &&
      'seasonNumber' in obj &&
      typeof obj.seasonNumber === 'number' &&
      'cast' in obj &&
      typeof obj.cast === 'object'
    );
  }
}
