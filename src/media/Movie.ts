import { MediaElement } from './MediaElement';

export interface MovieMetadata {
  length: number;
  genere: string;
  releaseDate: string;
  cast: { [actor: string]: string };
}

export class Movie extends MediaElement {
  public metadata: MovieMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: MovieMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public print(): void {
    console.log(`   Tytul: ${this.title}`);
    console.log(`   Rok wydania: ${this.releaseYear}`);
    console.log(`   Sciezka: ${this.path}`);
    console.log(`   Wlasciciel: ${this.getOwner()}`);
    console.log(`   Publiczny: ${this.isPublic() ? 'true' : 'false'}`);

    console.log(`   Dlugosc: ${this.secondsToHours(this.metadata.length)}`);
    console.log(`   Gatunek: ${this.metadata.genere}`);
    console.log(`   Data wydania: ${this.metadata.releaseDate}`);

    console.log(`   Obsada:`);
    for (const [actor, role] of Object.entries(this.metadata.cast)) {
      console.log(`      ${actor}: ${role}`);
    }
  }

  public printLocation(): void {
    console.log(`Biblioteka[${this.getOwner()}] -> Filmy -> ${this.title}(${this.releaseYear})`);
  }
}
