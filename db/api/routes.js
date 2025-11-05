import express from "express";
import db from "#db/client";
import { getTrack, getTracks } from "#db/queries/tracks";
import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
  getTrackByPlaylistId,
} from "#db/queries/playlists";
import { createPlaylistTracks } from "#db/queries/playlists-tracks";

const router = express.Router();
export default router;

//=== GET /tracks ===
router.get("/tracks", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.json(tracks);
  } catch (error) {
    console.error("couldn't GET tracks", error);
    next();
  }
});

//=== GET /tracks/:id ===
router.get("/tracks/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "id must be an integer" });
  }

  try {
    const track = await getTrack(id);
    if (!track) {
      res.status(404).json({ error: "track not found" });
    }

    res.json(track);
  } catch (error) {
    console.error("Error fetching track:", error);
    next();
  }
});

// === GET /playlists ===
router.get("/playlists", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.json(playlists);
  } catch (error) {
    console.error("couldn't GET playlists", error);
    next();
  }
});

//=== POST /playlists
router.post("/playlists", async (req, res, next) => {
  const { name, description } = req.body || {};

  if (!name || !description) {
    res.status(400).json({ error: "request body is missing required fields" });
    next();
  }

  if (!req.body) {
    res.status(400).json({ error: "request body is needed" });
    next();
  }

  try {
    const newPlaylists = await createPlaylist({
      name,
      description,
    });
    res.status(201).json(newPlaylists);
  } catch (error) {}
});

// === GET /playlists/:id ===
router.get("/playlists/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "id needs to be an integer" });
    next();
  }

  try {
    const playlist = await getPlaylist(id);

    if (!playlist) {
      console.log("getPlylist() returns");
      res.status(404).json({ error: "playlist does not exist" });
      next();
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error("couldn't GET playlist id");
    next(error);
  }
});

router.get("/playlists/:id/tracks", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "id must be an integer" });
    }

    const tracks = await getTrackByPlaylistId(id);
    if (!tracks || tracks.length === 0) {
      return res
        .status(404)
        .json({ error: "no tracks found for this playlist" });
    }

    res.status(200).json(tracks);
  } catch (error) {
    console.error("Couldn't GET playlist tracks:", error);
    next(error);
  }
});

// I used chatgpt to help me with this part
router.post("/playlists/:id/tracks", async (req, res) => {
  try {
    const playlistId = Number(req.params.id);
    if (isNaN(playlistId)) {
      return res.status(400).json({ error: "Playlist ID must be a number" });
    }

    const { tracks_id, trackId } = req.body || {};
    if (tracks_id === undefined && trackId === undefined) {
      return res.status(400).json({ error: "Request body requires trackId" });
    }

    const trackIdNumber = Number(tracks_id ?? trackId);
    if (isNaN(trackIdNumber)) {
      return res.status(400).json({ error: "Track ID must be a number" });
    }

    const playlist = await getPlaylist(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist does not exist" });
    }

    const track = await getTrack(trackIdNumber);
    if (!track) {
      return res.status(400).json({ error: "Track does not exist" });
    }

    const existing = await db.query(
      `SELECT * FROM playlists_tracks WHERE playlists_id = $1 AND tracks_id = $2`,
      [playlistId, trackIdNumber]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Track already in playlist" });
    }

    const playlistTrack = await createPlaylistTracks(playlistId, trackIdNumber);

    // Convert keys to match test
    return res.status(201).json({
      id: playlistTrack.id,
      playlist_id: playlistTrack.playlists_id,
      track_id: playlistTrack.tracks_id,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Track already in playlist" });
    }

    console.error("Error in POST /playlists/:id/tracks", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
