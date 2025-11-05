import db from "#db/client";

// === create playlist ===
export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *;
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

// === fetch playlists array ===
export async function getPlaylists() {
  try {
    const sql = `
    SELECT * FROM playlists ORDER BY playlists.id;
    `;
    const { rows: playlists } = await db.query(sql);
    return playlists;
  } catch (error) {
    console.error("couldn't fetch getPlaylists", error);
    throw error;
  }
}

// === fetch playlist by id ===
export async function getPlaylist(id) {
  try {
    const sql = `
        SELECT * FROM playlists WHERE playlists.id = $1;
        `;
    const { rows } = await db.query(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error("couldn't fetch getPlaylist", error);
    throw error;
  }
}

// === GET /playlists/:id/tracks
export async function getTrackByPlaylistId(id) {
  try {
    const sql = `
        SELECT tracks.*
        FROM
   tracks
    JOIN playlists_tracks ON playlists_tracks.tracks_id = tracks.id
    JOIN playlists ON playlists.id = playlists_tracks.playlists_id
    WHERE playlists.id = $1;
        `;
    const { rows: tracksById } = await db.query(sql, [id]);
    return tracksById;
  } catch (error) {
    console.error("couldn't fetch getTrackByPlaylistId", error);
    throw error;
  }
}
