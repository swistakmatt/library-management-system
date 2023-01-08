import { Ebook, EbookMetadata } from 'media/Ebook';
import { MediaElementBuilder } from './MediaElementBuilder';

export class EbookBuilder extends MediaElementBuilder {
  public metadata: EbookMetadata;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean, metadata: EbookMetadata) {
    super(title, releaseYear, path, owner, _public);
    this.metadata = metadata;
  }

  public setMetadata(metadata: EbookMetadata): EbookBuilder {
    this.metadata = metadata;
    return this;
  }

  public build(): Ebook {
    return new Ebook(this.title, this.releaseYear, this.path, this.owner, this._public, this.metadata);
  }
}
