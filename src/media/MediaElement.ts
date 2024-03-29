import { DatabaseElement } from '../database/DatabaseElement';

export interface BaseMetadata {
  id: number | null;
  title: string;
  releaseYear: number;
  path: string;
  owner: string;
  _public: boolean;
}

export abstract class MediaElement implements Omit<BaseMetadata, 'owner' | '_public'>, DatabaseElement {
  public id: number | null = null;
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

  public static secondsToHours(length: number): string {
    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length / 60) % 60);
    const seconds = length % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  public static secondsToMinutes(length: number): string {
    const minutes = Math.floor(length / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (length % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  public setId(id: number): void {
    this.id = id;
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

  public getId(): number | null {
    return this.id;
  }

  public getOwner(): string {
    return this.owner;
  }

  public isPublic(): boolean {
    return this._public;
  }

  public static isMediaMetadata(obj: unknown): obj is BaseMetadata & { id: number } {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      'id' in obj &&
      typeof obj.id === 'number' &&
      'title' in obj &&
      typeof obj.title === 'string' &&
      'releaseYear' in obj &&
      typeof obj.releaseYear === 'number' &&
      'path' in obj &&
      typeof obj.path === 'string' &&
      'owner' in obj &&
      typeof obj.owner === 'string' &&
      '_public' in obj &&
      typeof obj._public === 'boolean'
    );
  }

  public abstract print(): void;

  public abstract printLocation(): void;

  public getBaseMetadata(): BaseMetadata {
    return {
      id: this.id,
      title: this.title,
      releaseYear: this.releaseYear,
      path: this.path,
      owner: this.owner,
      _public: this._public,
    };
  }

  public setBaseMetadata(metadata: Omit<BaseMetadata, 'id'>): void {
    this.title = metadata.title;
    this.releaseYear = metadata.releaseYear;
    this.path = metadata.path;
    this.owner = metadata.owner;
    this._public = metadata._public;
  }

  public setMetadata(metadata: unknown): void {
    throw new Error('Method not implemented.');
  }

  public getMetadata(): unknown {
    throw new Error('Method not implemented.');
  }
}
