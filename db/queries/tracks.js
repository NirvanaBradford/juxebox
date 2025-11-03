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
