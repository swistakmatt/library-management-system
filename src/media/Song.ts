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

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: SongMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   Tytul: ${this.title}`);
    console.log(`   Rok wydania: ${this.releaseYear}`);
    console.log(`   Sciezka: ${this.path}`);
    console.log(`   Wlasciciel: ${this.getOwner()}`);
    console.log(`   Publiczny: ${this.isPublic() ? 'true' : 'false'}`);

    console.log(`   Dlugosc: ${Song.secondsToHours(this.metadata.length)}`);
    console.log(`   Gatunek: ${this.metadata.genre}`);
    console.log(`   Data wydania: ${this.metadata.releaseDate}`);

    console.log(`   Wykonawca: ${this.metadata.artist}`);
    console.log(`   Album: ${this.metadata.album}`);
    console.log(`   Numer utworu: ${this.metadata.trackNumber}`);
  }

  public printLocation(): void {
    console.log(`Biblioteka[${this.getOwner()}] -> Muzyka -> ${this.metadata.artist} 
    -> ${this.metadata.album} -> ${this.metadata.trackNumber} -> ${this.title}`);
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public static isSongMetadata(obj: unknown): obj is SongMetadata {
    return (
      obj !== null && typeof obj === 'object' &&
      'length' in obj && typeof obj.length === 'number' &&
      'genre' in obj && typeof obj.genre === 'string' &&
      'releaseDate' in obj && typeof obj.releaseDate === 'string' &&
      'artist' in obj && typeof obj.artist === 'string' &&
      'album' in obj && typeof obj.album === 'string' &&
      'trackNumber' in obj && typeof obj.trackNumber === 'number'
    );
  }
}
