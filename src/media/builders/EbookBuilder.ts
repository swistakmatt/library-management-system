import { Ebook, EbookMetadata } from '../Ebook.js';
import { MediaElementBuilder } from './MediaElementBuilder.js';

export class EbookBuilder extends MediaElementBuilder {
  public metadata: EbookMetadata;

  constructor();
  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EbookMetadata);
  constructor(
    title = 'Unknown Song',
    releaseYear?: number,
    path?: string,
    owner?: string,
    _public?: boolean,
    metadata: EbookMetadata = {
      author: 'Unknown Author',
      genre: 'Unknown Genre',
      numberOfPages: 0,
      releaseDate: '1970-01-01',
    }
  ) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: EbookMetadata): this {
    this.metadata = metadata;
    return this;
  }

  public build(): Ebook {
    const ebook = new Ebook(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
    this.softForceId(ebook);

    return ebook;
  }
}
