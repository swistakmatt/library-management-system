import { MediaElement } from './MediaElement.js';

export interface EbookMetadata {
  numberOfPages: number;
  genre: string;
  releaseDate: string;
  author: string;
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

    console.log(`   Ilosc stron: ${this.metadata.numberOfPages}`);
    console.log(`   Gatunek: ${this.metadata.genre}`);
    console.log(`   Data wydania: ${this.metadata.releaseDate}`);

    console.log(`   Autor: ${this.metadata.author}`);
  }

  public printLocation(): void {
    console.log(`Biblioteka[${this.getOwner()}] -> Ebooki -> ${this.metadata.author} -> ${this.title}`);
  }

  public getMetadata(): EbookMetadata {
    return this.metadata;
  }

  public static isEbookMetadata(obj: unknown): obj is EbookMetadata {
    return (
      obj !== null && typeof obj === 'object' &&
      'numberOfPages' in obj && typeof obj.numberOfPages === 'number' &&
      'genre' in obj && typeof obj.genre === 'string' &&
      'releaseDate' in obj && typeof obj.releaseDate === 'string' &&
      'author' in obj && typeof obj.author === 'string'
    );
  }
}
