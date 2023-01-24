import { Song } from '../src/media/Song';
import { SongRepository } from '../src/media/repositories/SongRepository';
import { SongBuilder } from '../src/media/builders/SongBuilder';
import { Database } from '../src/database/Database';

let repository: SongRepository;
let song: Song;
const songData = {
  title: 'songTitle',
  releaseYear: 2020,
  path: 'path/to/song',
  owner: 'owner',
  _public: true,
  album: 'albumName',
  artist: 'artistName',
  length: 300,
  genre: 'genre',
  releaseDate: '2020-01-01',
  trackNumber: 1,
};

beforeAll(async () => {
  await Database.getConnection().run('DROP TABLE IF EXISTS Song');
  await Database.getInstance().initTables();
});

beforeEach(async () => {
  const db = Database.getConnection();
  await db.run('DELETE FROM Song');
});

beforeEach(() => {
  repository = new SongRepository();
  song = new SongBuilder()
    .setTitle(songData.title)
    .setReleaseYear(songData.releaseYear)
    .setPath(songData.path)
    .setOwner(songData.owner)
    .setPublic(songData._public)
    .setMetadata({
      album: songData.album,
      artist: songData.artist,
      length: songData.length,
      genre: songData.genre,
      releaseDate: songData.releaseDate,
      trackNumber: songData.trackNumber,
    })
    .build();
});

test('should insert Song into the database', async () => {
  const id = await repository.set(song);
  expect(id).toBeGreaterThan(0);
});

test('should update a Song in the database', async () => {
  const id = await repository.set(song);

  song.setTitle('newTitle');
  song.setOwner('newOwner');
  song.setVisibility(true);
  song.setMetadata({
    album: 'newAlbum',
    artist: 'newArtist',
    length: 333,
    genre: 'Action',
    releaseDate: '2023-01-21',
    trackNumber: 2,
  });
  song.setId(id);

  await repository.update(song);

  const updatedSong = await repository.getById(id);

  expect(updatedSong.title).toBe('newTitle');
  expect(updatedSong.getOwner()).toBe('newOwner');
  expect(updatedSong.isPublic()).toBe(true);
  expect(updatedSong.getMetadata().album).toBe('newAlbum');
  expect(updatedSong.getMetadata().artist).toBe('newArtist');
  expect(updatedSong.getMetadata().length).toBe(333);
  expect(updatedSong.getMetadata().genre).toBe('Action');
  expect(updatedSong.getMetadata().releaseDate).toBe('2023-01-21');
  expect(updatedSong.getMetadata().trackNumber).toBe(2);
});

test('should delete a Song from the database', async () => {
  const id = await repository.set(song);
  song.setId(id);
  await repository.delete(song);

  await expect(async () => repository.getById(id)).rejects.toThrow();
});

test('should get all songs', async () => {
  const id = await repository.set(song);
  song.setId(id);
  const songs = await repository.getAll();

  expect(songs.length).toBeGreaterThan(0);
});

