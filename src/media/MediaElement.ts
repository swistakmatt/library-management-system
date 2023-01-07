export interface MediaMetadata {
  title: string;
  releaseYear: number;
  path: string;
  owner: string;
  _public: boolean;
}

export class MediaElement {
  public title: string;
  public releaseYear: number;
  public path: string;
  private owner: string;
  private _public: boolean;

  constructor(title: string, releaseYear: number, path: string, owner: string, _public: boolean) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.path = path;
    this.owner = owner;
    this._public = _public;
  }

  public secondsToHours(length: number): string {
    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length / 60) % 60);
    const seconds = length % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setReleaseYear(newReleaseYear: number): void {
    this.releaseYear = newReleaseYear;
  }

  public setOwner(user: string): void {
    this.owner = user;
  }

  public setVisibility(status: boolean): void {
    this._public = status;
  }

  public setPath(newPath: string): void {
    this.path = newPath;
  }

  public getOwner(): string {
    return this.owner;
  }

  public isPublic(): boolean {
    return this._public;
  }
}
