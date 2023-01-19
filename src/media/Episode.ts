import chalk from 'chalk';
import { MediaElement } from './MediaElement';
import { MediaMemento, MediaMementoOriginator, Memento } from './repositories/MediaMemento';

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

export class Episode extends MediaElement implements MediaMementoOriginator<EpisodeMetadata> {
  public metadata: EpisodeMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EpisodeMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   ` + chalk.yellow(`Title: `) + `${this.title}`);
    console.log(`   ` + chalk.yellow(`Release year: `) + `${this.releaseYear}`);
    console.log(`   ` + chalk.yellow(`Path: `) + `${this.path}`);
    console.log(`   ` + chalk.yellow(`Owner: `) + `${this.getOwner()}`);
    console.log(`   ` + chalk.yellow(`Public: `) + `${this.isPublic() ? 'true' : 'false'}`);
    console.log(`   ` + chalk.yellow(`Length: `) + `${Episode.secondsToHours(this.metadata.length)}`);
    console.log(`   ` + chalk.yellow(`Genre: `) + `${this.metadata.genre}`);
    console.log(`   ` + chalk.yellow(`Release date: `) + `${this.metadata.releaseDate}`);
    console.log(`   ` + chalk.yellow(`Series name: `) + `${this.metadata.series}`);
    console.log(`   ` + chalk.yellow(`Episode number: `) + `${this.metadata.episodeNumber}`);
    console.log(`   ` + chalk.yellow(`Season number: `) + `${this.metadata.seasonNumber}`);
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
      `${this.metadata.episodeNumber} -> ${this.title}(${this.releaseYear})`,
    );
  }

  public setMetadata(metadata: EpisodeMetadata): void {
    this.metadata = metadata;
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

  public save(): Memento<EpisodeMetadata> {
    const memento = new MediaMemento({
      ...this.getBaseMetadata(),
      ...this.metadata,
    });

    return memento;
  }

  public restore(memento: Memento<EpisodeMetadata>): void {
    const state = memento.getState();

    this.setBaseMetadata({
      title: state.title,
      releaseYear: state.releaseYear,
      path: state.path,
      owner: state.owner,
      _public: state._public,
    });

    this.setMetadata({
      cast: state.cast,
      episodeNumber: state.episodeNumber,
      genre: state.genre,
      length: state.length,
      releaseDate: state.releaseDate,
      seasonNumber: state.seasonNumber,
      series: state.series,
    });
  }
}
