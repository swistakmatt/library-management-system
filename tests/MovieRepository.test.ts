import { MovieRepository } from '../src/media/repositories/MovieRepository';
import { Movie } from '../src/media/Movie';
import { Database } from '../src/database/Database';
import { MovieBuilder } from '../src/media/builders/MovieBuilder';

let repository: MovieRepository;
let movie: Movie;
const movieData = {
  title: 'movieTitle',
  releaseYear: 2020,
  path: 'path/to/movie',
  owner: 'owner',
  _public: true,
  length: 300,
  genre: 'genre',
  releaseDate: '2020-01-01',
  cast: { actor1: 'role1', actor2: 'role2' },
};

beforeAll(async () => {
  await Database.getConnection().run('DROP TABLE User');
  await Database.getInstance().initTables();
});

beforeEach(async () => {
  const db = Database.getConnection();
  await db.run('DELETE FROM User');
});

beforeEach(() => {
  repository = new MovieRepository();
  movie = new MovieBuilder()
    .setTitle(movieData.title)
    .setReleaseYear(movieData.releaseYear)
    .setPath(movieData.path)
    .setOwner(movieData.owner)
    .setPublic(movieData._public)
    .setMetadata({
      length: movieData.length,
      genre: movieData.genre,
      releaseDate: movieData.releaseDate,
      cast: movieData.cast,
    })
    .build();
});

test('should insert Movie into the database', async () => {
  const id = await repository.set(movie);
  expect(id).toBeGreaterThan(0);
});

test('should update a Movie in the database', async () => {
  const id = await repository.set(movie);

  movie.setTitle('newTitle');
  movie.setOwner('newOwner');
  movie.setVisibility(true);
  movie.setMetadata({
    length: 333,
    genre: 'Action',
    releaseDate: '2023-01-21',
    cast: { actor3: 'role3' },
  });
  movie.setId(id);

  await repository.update(movie);

  const updatedMovie = await repository.getById(id);

  expect(updatedMovie.title).toBe('newTitle');
  expect(updatedMovie.getOwner()).toBe('newOwner');
  expect(updatedMovie.isPublic()).toBe(true);
  expect(updatedMovie.getMetadata().length).toBe(333);
  expect(updatedMovie.getMetadata().genre).toBe('Action');
  expect(updatedMovie.getMetadata().releaseDate).toBe('2023-01-21');
  expect(updatedMovie.getMetadata().cast).toEqual({ actor3: 'role3' });
});

test('should delete a Movie from the database', async () => {
  const id = await repository.set(movie);
  movie.setId(id);
  await repository.delete(movie);

  await expect(async () => repository.getById(id)).rejects.toThrow();
});

test('should get all movies', async () => {
  const id = await repository.set(movie);
  movie.setId(id);
  const movies = await repository.getAll();

  expect(movies.length).toBeGreaterThan(0);
});
