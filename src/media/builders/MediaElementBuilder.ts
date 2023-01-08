import { MediaElement } from 'media/MediaElement';

export class MediaElementBuilder {
  public title: string;
  public releaseYear: number;
  public path: string;
  public owner: string;
  public _public: boolean;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.path = path;
    this.owner = owner;
    this._public = _public;
  }

  public setTitle(title: string): MediaElementBuilder {
    this.title = title;
    return this;
  }

  public setReleaseYear(releaseYear: number): MediaElementBuilder {
    this.releaseYear = releaseYear;
    return this;
  }

  public setPath(path: string): MediaElementBuilder {
    this.path = path;
    return this;
  }

  public setOwner(owner: string): MediaElementBuilder {
    this.owner = owner;
    return this;
  }

  public setPublic(isPublic: boolean): MediaElementBuilder {
    this._public = isPublic;
    return this;
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
