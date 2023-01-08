import { MediaElement } from './MediaElement';

export interface EbookMetadata {
  lenght: number;
  genre: string;
  releaseDate: string;
  artist: string;
  album: string;
  trackNumber: number;
}

export class Ebook extends MediaElement {
  public metadata: EbookMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EbookMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   Tytul: ${this.title}`);
    console.log(`   Rok wydania: ${this.releaseYear}`);
    console.log(`   Sciezka: ${this.path}`);
    console.log(`   Wlasciciel: ${this.getOwner()}`);
    console.log(`   Publiczny: ${this.isPublic() ? 'true' : 'false'}`);

    console.log(`   Dlugosc: ${this.secondsToHours(this.metadata.lenght)}`);
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
}
