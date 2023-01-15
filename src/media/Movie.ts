import chalk from 'chalk';
import { MediaElement } from './MediaElement.js';

export interface MovieMetadata {
  length: number;
  genre: string;
  releaseDate: string;
  cast: { [actor: string]: string };
}

export class Movie extends MediaElement {
  public metadata: MovieMetadata;

  constructor(
    title: string,
    releaseYear: number,
    path: string,
    owner: string,
    _public: boolean,
    metadata: MovieMetadata
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
        `${Movie.secondsToHours(this.metadata.length)}`
    );
    console.log(`   ` + chalk.yellow(`Genre: `) + `${this.metadata.genre}`);
    console.log(
      `   ` + chalk.yellow(`Release date: `) + `${this.metadata.releaseDate}`
    );

    console.log(`   ` + chalk.yellow(`Cast:`));
    for (const [actor, role] of Object.entries(this.metadata.cast)) {
      console.log(`      ${actor}: ${role}`);
    }
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Library`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Movies `) +
        `-> ${this.title}(${this.releaseYear})`
    );
  }

  public getMetadata(): MovieMetadata {
    return this.metadata;
  }

  public static isMovieMetadata(obj: unknown): obj is MovieMetadata {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      'length' in obj &&
      typeof obj.length === 'number' &&
      'genre' in obj &&
      typeof obj.genre === 'string' &&
      'releaseDate' in obj &&
      typeof obj.releaseDate === 'string' &&
      'cast' in obj &&
      typeof obj.cast === 'object'
    );
  }
}
