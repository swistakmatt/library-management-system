import { EbookRepository } from '../src/media/repositories/EbookRepository';
import { Database } from '../src/database/Database';
import { Ebook } from '../src/media/Ebook';

const repository = new EbookRepository();

beforeAll(async () => {
  await Database.getConnection().run('DROP TABLE Ebook');
  await Database.getInstance().initTables();
});

beforeEach(async () => {
  const db = Database.getConnection();
  await db.run('DELETE FROM Ebook');
});

test('should insert an Ebook into the database', async () => {
  const ebook = new Ebook(
    'Test Ebook',
    2023,
    '/path/to/file',
    'Jan Kowalski',
    false,
    {
      numberOfPages: 222,
      genre: 'Fiction',
      releaseDate: '2023-01-20',
      author: 'Jan Kowalski',
    }
  );

  const id = await repository.set(ebook);
  expect(id).toBeGreaterThan(0);
});

test('should update an Ebook in the database', async () => {
  const ebook = new Ebook(
    'Test Ebook',
    2023,
    '/path/to/file',
    'Jan Kowalski',
    false,
    {
      numberOfPages: 222,
      genre: 'Fiction',
      releaseDate: '2023-01-20',
      author: 'Jan Kowalski',
    }
  );

  const id = await repository.set(ebook);

  ebook.setTitle('Test Ebook - Updated');
  ebook.setOwner('Marek Nowak');
  ebook.setVisibility(true);
  ebook.setMetadata({
    numberOfPages: 333,
    genre: 'Action',
    releaseDate: '2023-01-21',
    author: 'Marek Nowak',
  });
  ebook.setId(id);

  await repository.update(ebook);

  const updatedEbook = await repository.getById(id);

  expect(updatedEbook.title).toBe('Test Ebook - Updated');
  expect(updatedEbook.getOwner()).toBe('Marek Nowak');
  expect(updatedEbook.isPublic()).toBe(true);
  expect(updatedEbook.getMetadata().numberOfPages).toBe(333);
  expect(updatedEbook.getMetadata().genre).toBe('Action');
  expect(updatedEbook.getMetadata().releaseDate).toBe('2023-01-21');
  expect(updatedEbook.getMetadata().author).toBe('Marek Nowak');
});

test('should delete an Ebook from the database', async () => {
  const ebook = new Ebook(
    'Test Ebook',
    2023,
    '/path/to/file',
    'Jan Kowalski',
    false,
    {
      numberOfPages: 222,
      genre: 'Fiction',
      releaseDate: '20230-01-20',
      author: 'Jan Kowalski',
    }
  );

  const id = await repository.set(ebook);
  ebook.setId(id);
  await repository.delete(ebook);
  await expect(async () => repository.getById(id)).rejects.toThrow();
});

test('getById should return Ebook if exist', async () => {
  const repository = new EbookRepository();

  const ebook = new Ebook('title', 2023, 'path', 'owner', true, { numberOfPages: 100, genre: 'genre', releaseDate: '2020-01-01', author: 'author' });

  const id = await repository.set(ebook);

  const getEbook = await repository.getById(id);

  expect(getEbook).toBeInstanceOf(Ebook);
  expect(getEbook.getId()).toBe(id);
});

test('getAll should return an array of Ebooks', async () => {
  const repository = new EbookRepository();

  const ebook1 = new Ebook('title1', 2023, 'path1', 'owner1', true, { numberOfPages: 100, genre: 'genre1', releaseDate: '2023-01-20', author: 'author1' });
  const ebook2 = new Ebook('title2', 2023, 'path2', 'owner2', false, { numberOfPages: 200, genre: 'genre2', releaseDate: '2023-01-20', author: 'author2' });

  const ebook1Id = await repository.set(ebook1);
  const ebook2Id = await repository.set(ebook2);

  const ebooks = await repository.getAll();

  expect(Array.isArray(ebooks)).toBe(true);
  expect(ebooks.length).toBe(2);
  expect(ebooks[0].getId()).toBe(ebook1Id);
  expect(ebooks[1].getId()).toBe(ebook2Id);
});

test('hasId should return true if Ebook exist', async () => {
  const repository = new EbookRepository();

  const ebook = new Ebook('title', 2023, 'path', 'owner', true, { numberOfPages: 100, genre: 'genre', releaseDate: '2023-01-20', author: 'author' });

  const id = await repository.set(ebook);

  const hasId = await repository.hasId(id);

  expect(hasId).toBe(true);
});
