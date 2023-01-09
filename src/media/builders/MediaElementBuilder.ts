import { MediaElement, MediaMetadata } from '../MediaElement';

export class MediaElementBuilder implements MediaMetadata {
  public id: number | null = null;
  public title: string;
  public releaseYear: number;
  public path: string;
  public owner: string;
  public _public: boolean;

  constructor(
    title = 'Unknown Media',
    releaseYear = 0,
    path = '',
    owner = '',
    _public = false,
  ) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.path = path;
    this.owner = owner;
    this._public = _public;
  }

  public setId(id: number): this {
    this.id = id;
    return this;
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public setReleaseYear(releaseYear: number): this {
    this.releaseYear = releaseYear;
    return this;
  }

  public setPath(path: string): this {
    this.path = path;
    return this;
  }

  public setOwner(owner: string): this {
    this.owner = owner;
    return this;
  }

  public setPublic(isPublic: boolean): this {
    this._public = isPublic;
    return this;
  }

  public getId(): number | null {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getReleaseYear(): number {
    return this.releaseYear;
  }

  public getPath(): string {
    return this.path;
  }

  public getOwner(): string {
    return this.owner;
  }

  public build(): MediaElement {
    return new MediaElement(this.title, this.releaseYear, this.path, this.owner, this._public);
  }
}
