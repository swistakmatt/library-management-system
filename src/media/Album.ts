import chalk from 'chalk';
import { Song, SongMetadata } from './Song.js';

export class Album {
  private metadata: SongMetadata;
  private releaseYear: number;
  private tracks: Song[] = [];

  constructor(song: Song) {
    this.metadata = song.getMetadata();
    this.releaseYear = song.releaseYear;
  }

  public getMetadata(): SongMetadata {
    return this.metadata;
  }

  public getReleaseYear(): number {
    return this.releaseYear;
  }

  public getTracks(): Song[] {
    return this.tracks;
  }

  public addSong(song: Song): void {
    this.tracks.push(song);
  }

  public print(): void {
    console.log(
      chalk.yellow(`Album: `) +
        `${this.metadata.album} - ` +
        chalk.yellow(`Wykonawca: `) +
        `${this.metadata.artist}`
    );
    console.log(
      chalk.yellow(`Gatunek: `) +
        `${this.metadata.genre}, ` +
        chalk.yellow(`Rok: `) +
        `${this.releaseYear}`
    );
    for (const track of this.tracks) {
      console.log(
        `   ${track.getMetadata().trackNumber}. ${
          track.title
        }(${Song.secondsToMinutes(track.getMetadata().length)})`
      );
    }
  }
}
