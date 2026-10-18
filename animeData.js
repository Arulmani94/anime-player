// ============================================================
// ALL CONTENT LIVES HERE. Edit this file to add/change anime.
// ============================================================

// Placeholder artwork (generated). Replace with your own image URLs
// or image files you put in the project, e.g. "images/ep1.jpg".
const art = (label, color) =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
     <rect width='640' height='360' fill='${color}'/>
     <text x='320' y='190' font-size='36' fill='white' fill-opacity='.85'
      text-anchor='middle' font-family='sans-serif'>${label}</text></svg>`);

// Public sample video (Blender Foundation, CC-BY) used ONLY to test the player.
const TEST_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const animeList = [
  {
    id: 'demo-series',
    title: 'title: 'Shinchan'',
    poster: art('Poster', '#134e3a'),
    description: 'A sample series that shows how the site works. Replace this text with your own description.',
    genres: ['Comedy', 'Adventure'],
    status: 'Ongoing',
    seasons: [
      {
        number: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 's1e1', season: 1, episode: 1, title: 'The Beginning',
            thumbnail: art('S01E01', '#1f3a5f'),
            driveUrl: 'https://drive.google.com/file/d/1Q0782PG9a2pz_UaXtOK-nWPqust3NCYY/view?usp=drivesdk',                  // <-- paste your Google Drive share link here
            altVideoUrl: TEST_VIDEO,       // <-- OR a direct, authorized .mp4/.webm URL
            subtitleUrl: '',               // optional .vtt file URL
            description: 'Sample episode that plays a public test video.'
          },
          {
            id: 's1e2', season: 1, episode: 2, title: 'A Drive Link Example',
            thumbnail: art('S01E02', '#5f3a1f'),
            driveUrl: 'https://drive.google.com/file/d/REPLACE_WITH_REAL_FILE_ID_1234/view?usp=sharing',
            altVideoUrl: '',
            subtitleUrl: '',
            description: 'Uses a placeholder Drive link, so you will most likely see the error screen.'
          },
          {
            id: 's1e3', season: 1, episode: 3, title: 'No Source Yet',
            thumbnail: art('S01E03', '#3a1f5f'),
            driveUrl: '', altVideoUrl: '', subtitleUrl: '',
            description: 'Has no video configured, to demonstrate the "missing source" message.'
          }
        ]
      },
      {
        number: 2,
        title: 'Season 2',
        episodes: [
          {
            id: 's2e1', season: 2, episode: 1, title: 'A New Season',
            thumbnail: art('S02E01', '#5f1f3a'),
            driveUrl: '', altVideoUrl: TEST_VIDEO, subtitleUrl: '',
            description: 'First episode of season 2.'
          },
          {
            id: 's2e2', season: 2, episode: 2, title: 'Second Chance',
            thumbnail: art('S02E02', '#1f5f4a'),
            driveUrl: '', altVideoUrl: TEST_VIDEO, subtitleUrl: '',
            description: 'Second episode of season 2.'
          }
        ]
      }
    ]
  }
];
