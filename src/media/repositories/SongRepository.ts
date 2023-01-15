import { SongBuilder } from '../../media/builders/SongBuilder.js';
import { Song } from '../../media/Song.js';
import { Database } from '../../database/Database.js';
import { Repository } from './Repository.js';


export class SongRepository extends Repository<Song> {
  protected tableName = 'Song';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async set(instance: Song) {
    const db = Database.getConnection();

    const statement = await db.get(
      `INSERT INTO Song 
       (title, releaseYear, path, owner, public, album, artist, length, genre, releaseDate, trackNumber)
       VALUES
       ($title, $releaseYear, $path, $owner, $public, $album, $artist, $length, $genre, $releaseDate, $trackNumber)
       returning id`,
      {
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $album: instance.metadata.album,
        $artist: instance.metadata.artist,
        $length: instance.metadata.length,
        $genre: instance.metadata.genre,
        $releaseDate: instance.metadata.releaseDate,
        $trackNumber: instance.metadata.trackNumber,
      }
    );


    if (this.statementContainsId(statement)) {
      return statement.id;
    } else {
      throw new Error('Could not insert song');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(instance: Song) {
    const db = Database.getConnection();
    const songMetadata = instance.getMetadata();

    if (instance.id === null) throw new Error('Song id is null');

    await db.run(
      `UPDATE Song SET
        title = $title,
        releaseYear = $releaseYear,
        path = $path,
        owner = $owner,
        public = $public,
        length = $length,
        genre = $genre,
        releaseDate = $releaseDate,
        artist = $artist,
        album = $album,
        trackNumber = $trackNumber
        
        WHERE id = $id`,
      {
        $id: instance.id,
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $length: songMetadata.length,
        $genre: songMetadata.genre,
        $releaseDate: songMetadata.releaseDate,
        $artist: songMetadata.artist,
        $album: songMetadata.album,
        $trackNumber: songMetadata.trackNumber,
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected statementToInstance(statement: unknown) {
    if (statement === undefined) throw new Error('Song not found');

    // dirty fix to translate public<int> into _public<bool>
    if (
      statement !== null && typeof statement === 'object' &&
      'public' in statement && typeof statement.public === 'number'
    ) {
      statement = { ...statement, ...{ _public: statement.public === 1 ? true : false } };
    }


    if (Song.isSongMetadata(statement) && Song.isMediaMetadata(statement)) {
      return new SongBuilder()
        .setId(statement.id)
        .setTitle(statement.title)
        .setReleaseYear(statement.releaseYear)
        .setPath(statement.path)
        .setOwner(statement.owner)
        .setPublic(statement._public)
        .setMetadata({
          album: statement.album,
          artist: statement.artist,
          length: statement.length,
          genre: statement.genre,
          releaseDate: statement.releaseDate,
          trackNumber: statement.trackNumber,
        })
        .build();
    } else {
      throw new Error('Song metadata is invalid');
    }
  }
}
