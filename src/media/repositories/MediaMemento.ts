import { MediaMetadata as ElementMetadata } from '../LibraryContainer.js';
import { MediaMetadata } from '../MediaElement.js';

export type MediaMementoState<T extends ElementMetadata> = T & Omit<MediaMetadata, 'id'>;

export interface Memento<T extends ElementMetadata> {
  getState(): MediaMementoState<T>;
  getName(): string;
  getDate(): Date;
}

export interface MediaMementoOriginator<T extends ElementMetadata> {
  save(): Memento<T>;
  restore(memento: Memento<T>): void;
}

export class MediaMemento<T extends ElementMetadata> implements Memento<T> {
  private state: MediaMementoState<T>;
  private date: Date;

  constructor(state: MediaMementoState<T>) {
    this.state = state;
    this.date = new Date();
  }

  public getState(): MediaMementoState<T> {
    return this.state;
  }

  public getName(): string {
    return `${this.date.toISOString()} - ${this.state.title}(${this.state.releaseYear})`;
  }

  public getDate(): Date {
    return this.date;
  }
}
