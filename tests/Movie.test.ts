import chalk from 'chalk';
import { Movie } from '../src/media/Movie';

let movie: Movie;
const title = 'Test Movie';
const releaseYear = 2020;
const path = 'test/path';
const owner = 'testOwner';
const _public = true;
const metadata = {
  length: 100,
  genre: 'test genre',
  releaseDate: '01/01/2020',
  cast: { actor1: 'role1', actor2: 'role2' },
};

beforeEach(() => {
  movie = new Movie(title, releaseYear, path, owner, _public, metadata);
});

test('should create a Movie object', () => {
  expect(movie).toBeInstanceOf(Movie);
});

test('should set the properties correctly', () => {
  expect(movie.title).toEqual(title);
  expect(movie.releaseYear).toEqual(releaseYear);
  expect(movie.path).toEqual(path);
  expect(movie.getOwner()).toEqual(owner);
  expect(movie.isPublic()).toEqual(_public);
  expect(movie.metadata).toEqual(metadata);
});

test('should print the correct information', () => {
  const spy = jest.spyOn(console, 'log');
  movie.print();
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Title: `) + `${title}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Release year: `) + `${releaseYear}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Path: `) + `${path}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Owner: `) + `${owner}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Public: `) + `true`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Length: `) + `00:01:40`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Genre: `) + `${metadata.genre}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Release date: `) + `${metadata.releaseDate}`);
  expect(spy).toHaveBeenCalledWith(`   ` + chalk.yellow(`Cast:`));
  expect(spy).toHaveBeenCalledWith(`      actor1: role1`);
  expect(spy).toHaveBeenCalledWith(`      actor2: role2`);
  spy.mockRestore();
});

test('should print the correct location', () => {
  const spy = jest.spyOn(console, 'log');
  movie.printLocation();
  expect(spy).toHaveBeenCalledWith(chalk.yellow(`Library`) + `[${owner}] -> ` + chalk.yellow(`Movies `) + `-> ${title}(${releaseYear})`);
  spy.mockRestore();
});

test('should set and get metadata correctly', () => {
  const newMetadata = {
    length: 200,
    genre: 'new genre',
    releaseDate: '02/01/2020',
    cast: { actor3: 'role3', actor4: 'role4' },
  };
  movie.setMetadata(newMetadata);
  expect(movie.getMetadata()).toEqual(newMetadata);
});

test('should correctly check if an object is MovieMetadata', () => {
  const validMetadata = {
    length: 200,
    genre: 'new genre',
    releaseDate: '02/01/2020',
    cast: { actor3: 'role3', actor4: 'role4' },
  };
  const invalidMetadata = {
    length: '200',
    genre: 'new genre',
    releaseDate: '02/01/2020',
    cast: { actor3: 'role3', actor4: 'role4' },
  };
  expect(Movie.isMovieMetadata(validMetadata)).toBe(true);
  expect(Movie.isMovieMetadata(invalidMetadata)).toBe(false);
});

test('should save and restore the state correctly', () => {
  const memento = movie.save();
  const newMovie = new Movie('New Movie', 2021, 'new/path', 'newOwner', false, {
    length: 0,
    genre: '',
    releaseDate: '',
    cast: {},
  });
  newMovie.restore(memento);
  expect(newMovie.title).toEqual(title);
  expect(newMovie.releaseYear).toEqual(releaseYear);
  expect(newMovie.path).toEqual(path);
  expect(newMovie.getOwner()).toEqual(owner);
  expect(newMovie.isPublic()).toEqual(_public);
  expect(newMovie.metadata).toEqual(metadata);
});

