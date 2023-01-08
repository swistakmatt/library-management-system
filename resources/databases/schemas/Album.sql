CREATE TABLE IF NOT EXISTS Album (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  releaseYear INTEGER NOT NULL,
  length INTEGER NOT NULL,
  genre TEXT NOT NULL,
  releaseDate TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT NOT NULL,
  trackNumber INTEGER NOT NULL,
  tracks TEXT NOT NULL,
)