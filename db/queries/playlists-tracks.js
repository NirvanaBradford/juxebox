import db from "#db/client";

// === create playlists_tracks
export async function createPlaylistTracks(playlists_id, tracks_id) {
  const sql = `
    INSERT INTO playlists_tracks (playlists_id, tracks_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlists_id, tracks_id]);
  return playlistTrack;
}
