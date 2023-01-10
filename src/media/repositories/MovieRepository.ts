import { MovieBuilder } from '../../media/builders/MovieBuilder';
import { Movie } from '../../media/Movie';
import { Database } from '../../database/Database';
import { Repository } from './Repository';


export class MovieRepository extends Repository<Movie> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async getById(id: number) {
    const db = Database.getConnection();

    const statement = await db.get('SELECT * FROM Movie WHERE id = $id', { $id: id });

    return this.statementToInstance(statement);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async set(instance: Movie) {
    const db = Database.getConnection();

    const statement = await db.get(
      `INSERT INTO Movie 
       (title, releaseYear, path, owner, public, length, genre, releaseDate, cast)
       VALUES
       ($title, $releaseYear, $path, $owner, $public, $length, $genre, $releaseDate, $cast)
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
      }
    );


    if (this.statementContainsId(statement)) {
      return statement.id;
    } else {
      throw new Error('Could not insert movie');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(instance: Movie) {
    const db = Database.getConnection();
    const movieMetadata = instance.getMetadata();

    if (instance.id === null) throw new Error('Movie id is null');

    await db.run(
      `UPDATE Movie SET
        title = $title,
        releaseYear = $releaseYear,
        path = $path,
        owner = $owner,
        public = $public,
        length = $length,
        genre = $genre,
        releaseDate = $releaseDate,
        cast = $cast
        
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
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected statementToInstance(statement: unknown) {
    if (statement === undefined) throw new Error('Movie not found');

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


    if (Movie.isMovieMetadata(statement) && Movie.isMediaMetadata(statement)) {
      return new MovieBuilder()
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
        })
        .build();
    } else {
      throw new Error('Movie metadata is invalid');
    }
  }
}
