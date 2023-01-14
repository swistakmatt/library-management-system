import chalk from 'chalk';
import { MediaElement } from './MediaElement.js';

export interface EbookMetadata {
  numberOfPages: number;
  genre: string;
  releaseDate: string;
  author: string;
}

export class Ebook extends MediaElement {
  public metadata: EbookMetadata;

  constructor(
    title: string,
    releaseYear: number,
    path: string,
    owner: string,
    _public: boolean,
    metadata: EbookMetadata
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
      `   ` + chalk.yellow(`Ilosc stron: `) + `${this.metadata.numberOfPages}`
    );
    console.log(`   ` + chalk.yellow(`Gatunek: `) + `${this.metadata.genre}`);
    console.log(
      `   ` + chalk.yellow(`Data wydania: `) + `${this.metadata.releaseDate}`
    );

    console.log(`   ` + chalk.yellow(`Autor: `) + `${this.metadata.author}`);
  }

  public printLocation(): void {
    console.log(
      chalk.yellow(`Biblioteka`) +
        `[${this.getOwner()}] -> ` +
        chalk.yellow(`Ebooki `) +
        `-> ${this.metadata.author} -> ${this.title}`
    );
  }

  public getMetadata(): EbookMetadata {
    return this.metadata;
  }

  public static isEbookMetadata(obj: unknown): obj is EbookMetadata {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      'numberOfPages' in obj &&
      typeof obj.numberOfPages === 'number' &&
      'genre' in obj &&
      typeof obj.genre === 'string' &&
      'releaseDate' in obj &&
      typeof obj.releaseDate === 'string' &&
      'author' in obj &&
      typeof obj.author === 'string'
    );
  }
}
