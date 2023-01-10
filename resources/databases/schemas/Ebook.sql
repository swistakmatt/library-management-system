CREATE TABLE IF NOT EXISTS Ebook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  releaseYear INTEGER NOT NULL,
  path TEXT NOT NULL,
  owner TEXT NOT NULL,
  public BOOLEAN NOT NULL,
  numberOfPages INTEGER NOT NULL,
  genre TEXT NOT NULL,
  releaseDate TEXT NOT NULL,
  author TEXT NOT NULL
)