import { EpisodeRepository } from '../src/media/repositories/EpisodeRepository';
import { Database } from '../src/database/Database';
import { Episode } from '../src/media/Episode';

const repository = new EpisodeRepository();

beforeAll(async () => {
  await Database.getConnection().run('DROP TABLE IF EXISTS Episode');
  await Database.getInstance().initTables();
});

beforeEach(async () => {
  const db = Database.getConnection();
  await db.run('DELETE FROM Episode');
});

test('should insert an Episode into the database', async () => {
  const episode = new Episode(
    'Test Episode',
    2023,
    '/path/to/file',
    'Jan Kowalski ',
    false,
    {
      length: 222,
      genre: 'Fiction',
      releaseDate: '2023-01-20',
      cast: { 'Jan Kowalski': 'Actor' },
      series: 'Test Series',
      episodeNumber: 1,
      seasonNumber: 1,
    }
  );

  const id = await repository.set(episode);
  expect(id).toBeGreaterThan(0);
});

test('should update an Episode in the database', async () => {
  const episode = new Episode(
    'Test Episode',
    2023,
    '/path/to/file',
    'Jan Kowalski',
    false,
    {
      length: 222,
      genre: 'Fiction',
      releaseDate: '2023-01-20',
      cast: { 'Jan Kowalski': 'Actor' },
      series: 'Test Series',
      episodeNumber: 1,
      seasonNumber: 1,
    }
  );

  const id = await repository.set(episode);

  episode.setTitle('Test Episode - Updated');
  episode.setOwner('Marek Nowak');
  episode.setVisibility(true);
  episode.setMetadata({
    length: 333,
    genre: 'Action',
    releaseDate: '2023-01-21',
    cast: { 'Marek Nowak': 'Actor' },
    series: 'Test Series - Updated',
    episodeNumber: 2,
    seasonNumber: 2,
  });
  episode.setId(id);

  await repository.update(episode);

  const updatedEpisode = await repository.getById(id);

  expect(updatedEpisode.title).toBe('Test Episode - Updated');
  expect(updatedEpisode.getOwner()).toBe('Marek Nowak');
  expect(updatedEpisode.isPublic()).toBe(true);
  expect(updatedEpisode.getMetadata().length).toBe(333);
  expect(updatedEpisode.getMetadata().genre).toBe('Action');
  expect(updatedEpisode.getMetadata().releaseDate).toBe('2023-01-21');
  expect(updatedEpisode.getMetadata().cast).toEqual({ 'Marek Nowak': 'Actor' });
  expect(updatedEpisode.getMetadata().series).toBe('Test Series - Updated');
  expect(updatedEpisode.getMetadata().episodeNumber).toBe(2);
  expect(updatedEpisode.getMetadata().seasonNumber).toBe(2);
});

test('should delete an Episode from the database', async () => {
  const episode = new Episode(
    'Test Episode',
    2023,
    '/path/to/file',
    'Jan Kowalski',
    false,
    {
      length: 222,
      genre: 'Fiction',
      releaseDate: '2023-01-20',
      cast: { 'Jan Kowalski': 'Actor' },
      series: 'Test Series',
      episodeNumber: 1,
      seasonNumber: 1,
    }
  );

  const id = await repository.set(episode);
  episode.setId(id);
  await repository.delete(episode);
  await expect(async () => repository.getById(id)).rejects.toThrow();
});

test('getById should return Episode if exist', async () => {
  const repository = new EpisodeRepository();

  const episode = new Episode('Test Episode', 2023, '/path/to/file', 'Jan Kowalski', false,
    { length: 222, genre: 'Fiction', releaseDate: '2023-01-20', cast: { 'Jan Kowalski': 'Actor' }, series: 'Test Series', episodeNumber: 1, seasonNumber: 1 });

  const id = await repository.set(episode);

  const getEpisode = await repository.getById(id);

  expect(getEpisode).toBeInstanceOf(Episode);
  expect(getEpisode.getId()).toBe(id);
});

test('getAll should return an array of Episodes', async () => {
  const repository = new EpisodeRepository();

  const episode1 = new Episode('Test Episode 1', 2023, '/path/to/file', 'Jan Kowalski', false,
    { length: 222, genre: 'Fiction', releaseDate: '2023-01-20', cast: { 'Jan Kowalski': 'Actor' }, series: 'Test Series', episodeNumber: 1, seasonNumber: 1 });

  const episode2 = new Episode('Test Episode 2', 2023, '/path/to/file', 'Jan Kowalski', false,
    { length: 222, genre: 'Fiction', releaseDate: '2023-01-20', cast: { 'Jan Kowalski': 'Actor' }, series: 'Test Series', episodeNumber: 1, seasonNumber: 1 });

  const episode1Id = await repository.set(episode1);
  const episode2Id = await repository.set(episode2);

  const episodes = await repository.getAll();

  expect(Array.isArray(episodes)).toBe(true);
  expect(episodes.length).toBe(2);
  expect(episodes[0].getId()).toBe(episode1Id);
  expect(episodes[1].getId()).toBe(episode2Id);
});

test('hasId should return true if Episode exist', async () => {
  const repository = new EpisodeRepository();

  const episode = new Episode('Test Episode', 2023, '/path/to/file', 'Jan Kowalski', false,
    { length: 222, genre: 'Fiction', releaseDate: '2023-01-20', cast: { 'Jan Kowalski': 'Actor' }, series: 'Test Series', episodeNumber: 1, seasonNumber: 1 });

  const id = await repository.set(episode);

  const hasId = await repository.hasId(id);

  expect(hasId).toBe(true);
});
