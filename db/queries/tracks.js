import db from "#db/client";

// === create tracks ===
export async function createTracks({ name, duration_ms }) {
  const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *;
    `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

// === fetch tracks array ===
export async function getTracks() {
  try {
    const sql = `
    SELECT * FROM tracks ORDER BY tracks.id;
    `;
    const { rows: tracks } = await db.query(sql);
    return tracks;
  } catch (error) {
    console.error("couldn't fetch getTracks", error);
    throw error;
  }
}

// === fetch track by id ===
export async function getTrack(id) {
  try {
    const sql = `
        SELECT * FROM tracks WHERE tracks.id = $1;
        `;
    const {
      rows: [track],
    } = await db.query(sql, [id]);
    return track;
  } catch (error) {
    console.error("couldn't fetch getTrack", error);
    throw error;
  }
}
