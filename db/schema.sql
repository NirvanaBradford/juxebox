-- TODO
DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;


-- create playlist table
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);
    


-- create tracks table
CREATE TABLE tracks (
     id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_ms INTEGER NOT NULL
);


-- create a link between playlists and tracks
CREATE TABLE playlists_tracks (
    id SERIAL PRIMARY KEY,
    playlists_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    tracks_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    UNIQUE (playlists_id, tracks_id)
);
