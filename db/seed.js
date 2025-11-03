import db from "#db/client";
import { createPlaylist } from "./queries/playlists.js";
import { createTracks } from "./queries/tracks.js";
import { createPlaylistTracks } from "./queries/playlists-tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  // === seed playlists ===
  await createPlaylist({
    name: "Chill Vibes",
    description: "Relax and unwind",
  });

  await createPlaylist({
    name: "Workout Mix",
    description: "Pump-up tracks for the gym",
  });

  await createPlaylist({
    name: "Focus Flow",
    description: "Music to help you concentrate",
  });

  await createPlaylist({
    name: "Party Starters",
    description: "Get the party going",
  });

  await createPlaylist({
    name: "Acoustic Sessions",
    description: "Soft acoustic tunes",
  });

  await createPlaylist({
    name: "Throwback Hits",
    description: "Hits from the 2000s",
  });

  await createPlaylist({
    name: "Road Trip",
    description: "Perfect for long drives",
  });

  await createPlaylist({
    name: "Indie Essentials",
    description: "Best of indie and alt rock",
  });

  await createPlaylist({
    name: "Jazz Lounge",
    description: "Smooth and classy vibes",
  });

  await createPlaylist({
    name: "Late Night Beats",
    description: "Chill electronic sounds",
  });

  // === seed tracks ===
  await createTracks({
    name: "'Ocean Eyes",
    duration_ms: 210000,
  });

  await createTracks({
    name: "Blinding Lights",
    duration_ms: 200000,
  });

  await createTracks({
    name: "Stronger",
    duration_ms: 250000,
  });

  await createTracks({
    name: "Seven Nation Army",
    duration_ms: 230000,
  });

  await createTracks({
    name: "Let Me Love You",
    duration_ms: 220000,
  });

  await createTracks({
    name: "Viva La Vida",
    duration_ms: 242000,
  });

  await createTracks({
    name: "Shape of You",
    duration_ms: 234000,
  });

  await createTracks({
    name: "Bad Guy",
    duration_ms: 194000,
  });

  await createTracks({
    name: "Levitating",
    duration_ms: 203000,
  });

  await createTracks({
    name: "Counting Stars",
    duration_ms: 257000,
  });

  await createTracks({
    name: "Hey Ya!",
    duration_ms: 235000,
  });

  await createTracks({
    name: "Take Me Out",
    duration_ms: 238000,
  });

  await createTracks({
    name: "Yellow",
    duration_ms: 266000,
  });

  await createTracks({
    name: "Mr. Brightside",
    duration_ms: 222000,
  });

  await createTracks({
    name: "Numb",
    duration_ms: 185000,
  });

  await createTracks({
    name: "Lose Yourself",
    duration_ms: 326000,
  });

  await createTracks({
    name: "Don't Stop Believin",
    duration_ms: 250000,
  });

  await createTracks({
    name: "Can't Feel My Face",
    duration_ms: 213000,
  });

  await createTracks({
    name: "Believer",
    duration_ms: 204000,
  });

  await createTracks({
    name: "Riptide",
    duration_ms: 196000,
  });

  // === seed playlists_tracks ===
  await createPlaylistTracks({
    playlists_id: 1,
    tracks_id: 1,
  });

  await createPlaylistTracks({
    playlists_id: 1,
    tracks_id: 5,
  });

  await createPlaylistTracks({
    playlists_id: 9,
    tracks_id: 9,
  });

  await createPlaylistTracks({
    playlists_id: 2,
    tracks_id: 3,
  });

  await createPlaylistTracks({
    playlists_id: 2,
    tracks_id: 8,
  });

  await createPlaylistTracks({
    playlists_id: 2,
    tracks_id: 16,
  });

  await createPlaylistTracks({
    playlists_id: 3,
    tracks_id: 7,
  });

  await createPlaylistTracks({
    playlists_id: 3,
    tracks_id: 10,
  });

  await createPlaylistTracks({
    playlists_id: 4,
    tracks_id: 11,
  });

  await createPlaylistTracks({
    playlists_id: 4,
    tracks_id: 14,
  });

  await createPlaylistTracks({
    playlists_id: 5,
    tracks_id: 13,
  });

  await createPlaylistTracks({
    playlists_id: 6,
    tracks_id: 6,
  });

  await createPlaylistTracks({
    playlists_id: 7,
    tracks_id: 12,
  });

  await createPlaylistTracks({
    playlists_id: 8,
    tracks_id: 4,
  });

  await createPlaylistTracks({
    playlists_id: 10,
    tracks_id: 19,
  });
}
