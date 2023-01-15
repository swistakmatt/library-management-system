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
    console.log(`   ` + chalk.yellow(`Title: `) + `${this.title}`);
    console.log(`   ` + chalk.yellow(`Release year: `) + `${this.releaseYear}`);
    console.log(`   ` + chalk.yellow(`Path: `) + `${this.path}`);
    console.log(`   ` + chalk.yellow(`Owner: `) + `${this.getOwner()}`);
    console.log(
      `   ` +
        chalk.yellow(`Public: `) +
        `${this.isPublic() ? 'true' : 'false'}`
    );
    console.log(
      `   ` +
        chalk.yellow(`Length: `) +
        `${Episode.secondsToHours(this.metadata.length)}`
    );
    console.log(`   ` + chalk.yellow(`Genre: `) + `${this.metadata.genre}`);
    console.log(
      `   ` + chalk.yellow(`Release date: `) + `${this.metadata.releaseDate}`
    );
    console.log(
      `   ` + chalk.yellow(`Series name: `) + `${this.metadata.series}`
    );
    console.log(
      `   ` + chalk.yellow(`Episode number: `) + `${this.metadata.episodeNumber}`
    );
    console.log(
      `   ` + chalk.yellow(`Season number: `) + `${this.metadata.seasonNumber}`
    );
    console.log('   ' + chalk.yellow('Cast: '));
    for (const [actor, role] of Object.entries(this.metadata.cast)) {
      console.log(`      ${actor}: ${role}`);
    }
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Library`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Series `) +
        `-> ${this.metadata.series} 
    -> ` +
        chalk.yellow(`Season `) +
        `${this.metadata.seasonNumber} -> ` +
        chalk.yellow(`Episode `) +
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
