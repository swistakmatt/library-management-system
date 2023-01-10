import { Database } from '../../database/Database';
import { Repository } from './Repository';
import { Ebook } from '../Ebook';
import { EbookBuilder } from '../builders/EbookBuilder';


export class EbookRepository extends Repository<Ebook> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async getById(id: number) {
    const db = Database.getConnection();

    const statement = await db.get('SELECT * FROM Ebook WHERE id = $id', { $id: id });

    return this.statementToInstance(statement);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async set(instance: Ebook) {
    const db = Database.getConnection();

    const statement = await db.get(
      `INSERT INTO Ebook 
       (title, releaseYear, path, owner, public, numberOfPages, genre, releaseDate, author)
       VALUES
       ($title, $releaseYear, $path, $owner, $public, $numberOfPages, $genre, $releaseDate, $author)
       returning id`,
      {
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $numberOfPages: instance.metadata.numberOfPages,
        $genre: instance.metadata.genre,
        $releaseDate: instance.metadata.releaseDate,
        $author: instance.metadata.author,
      }
    );


    if (this.statementContainsId(statement)) {
      return statement.id;
    } else {
      throw new Error('Could not insert ebook');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(instance: Ebook) {
    const db = Database.getConnection();
    const movieMetadata = instance.getMetadata();

    if (instance.id === null) throw new Error('Ebook id is null');

    await db.run(
      `UPDATE Ebook SET
        title = $title,
        releaseYear = $releaseYear,
        path = $path,
        owner = $owner,
        public = $public,
        numberOfPages = $numberOfPages,
        genre = $genre,
        releaseDate = $releaseDate,
        author = $author
        
        WHERE id = $id`,
      {
        $id: instance.id,
        $title: instance.title,
        $releaseYear: instance.releaseYear,
        $path: instance.path,
        $owner: instance.getOwner(),
        $public: instance.isPublic(),
        $numberOfPages: movieMetadata.numberOfPages,
        $genre: movieMetadata.genre,
        $releaseDate: movieMetadata.releaseDate,
        $author: movieMetadata.author,
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected statementToInstance(statement: unknown) {
    if (statement === undefined) throw new Error('Ebook not found');

    // dirty fix to translate public<int> into _public<bool>
    if (
      statement !== null && typeof statement === 'object' &&
      'public' in statement && typeof statement.public === 'number'
    ) {
      statement = {
        ...statement,
        ...{
          _public: statement.public === 1 ? true : false,
        },
      };
    }


    if (Ebook.isEbookMetadata(statement) && Ebook.isMediaMetadata(statement)) {
      return new EbookBuilder()
        .setId(statement.id)
        .setTitle(statement.title)
        .setReleaseYear(statement.releaseYear)
        .setPath(statement.path)
        .setOwner(statement.owner)
        .setPublic(statement._public)
        .setMetadata({
          numberOfPages: statement.numberOfPages,
          genre: statement.genre,
          releaseDate: statement.releaseDate,
          author: statement.author,
        })
        .build();
    } else {
      throw new Error('Ebook metadata is invalid');
    }
  }
}
