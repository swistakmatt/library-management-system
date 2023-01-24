import { SongBuilder } from '../src/media/builders/SongBuilder';
import { Song } from '../src/media/Song';

jest.mock('../src/media/Song');

test('Should create a song with default values', () => {
  const songBuilder = new SongBuilder();
  const song = songBuilder.build();

  expect(song).toBeInstanceOf(Song);
  expect(Song).toHaveBeenCalledWith('Unknown Song', 0, '', '', false, {
    album: 'Unknown Album',
    artist: 'Unknown Artist',
    length: 0,
    genre: 'Unknown Genre',
    releaseDate: '1970-01-01',
    trackNumber: 0,
  });
});

test('Should create a song with custom values class constructor', () => {
  const songBuilder = new SongBuilder('Song Title', 2000, 'path/to/file', 'owner', true, {
    album: 'Album Title',
    artist: 'Artist Name',
    length: 100,
    genre: 'Genre Name',
    releaseDate: '2020-01-01',
    trackNumber: 1,
  });
  const song = songBuilder.build();

  expect(song).toBeInstanceOf(Song);
  expect(Song).toHaveBeenCalledWith('Song Title', 2000, 'path/to/file', 'owner', true, {
    album: 'Album Title',
    artist: 'Artist Name',
    length: 100,
    genre: 'Genre Name',
    releaseDate: '2020-01-01',
    trackNumber: 1,
  });
});

test('Should create a song with custom values using class methods', () => {
  const songBuilder = new SongBuilder();
  const song = songBuilder
    .setTitle('Song Title')
    .setReleaseYear(2000)
    .setPath('path/to/file')
    .setOwner('owner')
    .setPublic(true)
    .setMetadata({
      album: 'Album Title',
      artist: 'Artist Name',
      length: 100,
      genre: 'Genre Name',
      releaseDate: '2020-01-01',
      trackNumber: 1,
    })
    .build();

  expect(song).toBeInstanceOf(Song);
  expect(Song).toHaveBeenCalledWith('Song Title', 2000, 'path/to/file', 'owner', true, {
    album: 'Album Title',
    artist: 'Artist Name',
    length: 100,
    genre: 'Genre Name',
    releaseDate: '2020-01-01',
    trackNumber: 1,
  });
});
