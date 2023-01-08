import { Song, SongMetadata } from './Song';

export class Album {
  private metadata: SongMetadata;
  private releaseYear: number;
  private tracks: Song[] = [];

  constructor(song: Song) {
    this.metadata = song.getMetadata();
    this.releaseYear = song.releaseYear;
  }

  public print(): void {
    console.log(`Album: ${this.metadata.album} - Wykonawca: ${this.metadata.artist}`);
    console.log(`Gatunek: ${this.metadata.genre}, Rok: ${this.releaseYear}`);
    for (const track of this.tracks) {
      console.log(`   ${track.getMetadata().trackNumber}. ${track.title}(${Song.secondsToMinutes(track.getMetadata().length)})`);
    }
  }
}
