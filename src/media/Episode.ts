import { MediaElement } from './MediaElement';

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

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EpisodeMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   Tytul: ${this.title}`);
    console.log(`   Rok wydania: ${this.releaseYear}`);
    console.log(`   Sciezka: ${this.path}`);
    console.log(`   Wlasciciel: ${this.getOwner()}`);
    console.log(`   Publiczny: ${this.isPublic() ? 'true' : 'false'}`);
    console.log(`   Dlugosc: ${Episode.secondsToHours(this.metadata.length)}`);
    console.log(`   Gatunek: ${this.metadata.genre}`);
    console.log(`   Data wydania: ${this.metadata.releaseDate}`);
    console.log(`   Nazwa serialu: ${this.metadata.series}`);
    console.log(`   Numer odcinka: ${this.metadata.episodeNumber}`);
    console.log(`   Numer sezonu: ${this.metadata.seasonNumber}`);
    console.log('   Obsada:');
    for (const [actor, role] of Object.entries(this.metadata.cast)) {
      console.log(`      ${actor}: ${role}`);
    }
  }

  public printLocation(): void {
    console.log(`Biblioteka[${this.getOwner()}] -> Seriale -> ${this.metadata.series} 
    -> Sezon ${this.metadata.seasonNumber} -> Epizod ${this.metadata.episodeNumber} -> ${this.title}(${this.releaseYear})`);
  }

  public getMetadata(): EpisodeMetadata {
    return this.metadata;
  }

  public static isEpisodeMetadata(obj: unknown): obj is EpisodeMetadata {
    return (
      obj !== null && typeof obj === 'object' &&
      'length' in obj && typeof obj.length === 'number' &&
      'genre' in obj && typeof obj.genre === 'string' &&
      'releaseDate' in obj && typeof obj.releaseDate === 'string' &&
      'series' in obj && typeof obj.series === 'string' &&
      'episodeNumber' in obj && typeof obj.episodeNumber === 'number' &&
      'seasonNumber' in obj && typeof obj.seasonNumber === 'number' &&
      'cast' in obj && typeof obj.cast === 'object'
    );
  }
}
