import { Database } from '../../database/Database.js';
import { Repository } from './Repository.js';
import { Episode } from '../Episode.js';
import { EpisodeBuilder } from '../builders/EpisodeBuilder.js';


export class EpisodeRepository extends Repository<Episode> {
  protected tableName = 'Episode';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async set(instance: Episode) {
    const db = Database.getConnection();

    const statement = await db.get(
      `INSERT INTO Episode 
       (title, releaseYear, path, owner, public, length, genre, releaseDate, cast, series, episodeNumber, seasonNumber)
       VALUES
       ($title, $releaseYear, $path, $owner, $public, $length, $genre, $releaseDate, $cast, $series, $episodeNumber, $seasonNumber)
       returning id`,
      {
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $length: instance.metadata.length,
        $genre: instance.metadata.genre,
        $releaseDate: instance.metadata.releaseDate,
        $cast: JSON.stringify(instance.metadata.cast),
        $series: instance.metadata.series,
        $episodeNumber: instance.metadata.episodeNumber,
        $seasonNumber: instance.metadata.seasonNumber,
      }
    );


    if (this.statementContainsId(statement)) {
      return statement.id;
    } else {
      throw new Error('Could not insert episode');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(instance: Episode) {
    const db = Database.getConnection();
    const movieMetadata = instance.getMetadata();

    if (instance.id === null) throw new Error('Episode id is null');

    await db.run(
      `UPDATE Episode SET
        title = $title,
        releaseYear = $releaseYear,
        path = $path,
        owner = $owner,
        public = $public,
        length = $length,
        genre = $genre,
        releaseDate = $releaseDate,
        cast = $cast,
        $series: $series,
        $episodeNumber: $episodeNumber,
        $seasonNumber: $seasonNumber,
        
        WHERE id = $id`,
      {
        $id: instance.id,
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $length: movieMetadata.length,
        $genre: movieMetadata.genre,
        $releaseDate: movieMetadata.releaseDate,
        $cast: JSON.stringify(movieMetadata.cast),
        $series: instance.metadata.series,
        $episodeNumber: instance.metadata.episodeNumber,
        $seasonNumber: instance.metadata.seasonNumber,
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected statementToInstance(statement: unknown) {
    if (statement === undefined) throw new Error('Episode not found');

    // dirty fix to translate public<int> into _public<bool>
    // dirty fix to parse json in cast
    if (
      statement !== null && typeof statement === 'object' &&
      'public' in statement && typeof statement.public === 'number' &&
      'cast' in statement && typeof statement.cast === 'string'
    ) {
      statement = {
        ...statement,
        ...{
          _public: statement.public === 1 ? true : false,
          cast: JSON.parse(statement.cast) as { [key: string]: string }, // very unsafe
        },
      };
    }


    if (Episode.isEpisodeMetadata(statement) && Episode.isMediaMetadata(statement)) {
      return new EpisodeBuilder()
        .setId(statement.id)
        .setTitle(statement.title)
        .setReleaseYear(statement.releaseYear)
        .setPath(statement.path)
        .setOwner(statement.owner)
        .setPublic(statement._public)
        .setMetadata({
          length: statement.length,
          genre: statement.genre,
          releaseDate: statement.releaseDate,
          cast: statement.cast,
          episodeNumber: statement.episodeNumber,
          seasonNumber: statement.seasonNumber,
          series: statement.series,
        })
        .build();
    } else {
      throw new Error('Episode metadata is invalid');
    }
  }
}
