// ============================================================
// ALL CONTENT LIVES HERE. Edit this file to add/change anime.
// ============================================================

const art = (label, color) =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
     <rect width='640' height='360' fill='${color}'/>
     <text x='320' y='190' font-size='36' fill='white' fill-opacity='.85'
      text-anchor='middle' font-family='sans-serif'>${label}</text></svg>`);

export const animeList = [
  {
    id: 'shinchan-tamil',
    title: 'Crayon Shin-chan',
    poster: art('Shin-chan', '#e64a19'),
    description: 'Crayon Shin-chan episodes in Tamil across multiple seasons.',
    genres: ['Comedy', 'Animation', 'Kids'],
    status: 'Ongoing',
    seasons: [
      {
        number: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 's1e1', season: 1, episode: 1, title: 'Season 1 Episode 1',
            thumbnail: art('S01E01', '#1f3a5f'),
            driveUrl: 'https://drive.google.com/file/d/1o9Vvc06FQNsPuW02iEhYbCQLfoHtoZuS/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 1'
          },
          {
            id: 's1e2', season: 1, episode: 2, title: 'Season 1 Episode 2',
            thumbnail: art('S01E02', '#2a4d69'),
            driveUrl: 'https://drive.google.com/file/d/1CX3xPYxx1-FqEINCRr_v5Xb9R-viZUIX/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 2'
          },
          {
            id: 's1e3', season: 1, episode: 3, title: 'Season 1 Episode 3',
            thumbnail: art('S01E03', '#4b86b4'),
            driveUrl: 'https://drive.google.com/file/d/1KpAUtCxp1HuFwoSyTRMikOlnQQVNWJGA/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 3'
          },
          {
            id: 's1e4', season: 1, episode: 4, title: 'Season 1 Episode 4',
            thumbnail: art('S01E04', '#63ace5'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 4'
          },
          {
            id: 's1e5', season: 1, episode: 5, title: 'Season 1 Episode 5',
            thumbnail: art('S01E05', '#1f3a5f'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 5'
          },
          {
            id: 's1e6', season: 1, episode: 6, title: 'Season 1 Episode 6',
            thumbnail: art('S01E06', '#2a4d69'),
            driveUrl: 'https://drive.google.com/file/d/11WbIZSx1OZo1hmt-azXqrR2Gk51jYTG4/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 6'
          },
          {
            id: 's1e7', season: 1, episode: 7, title: 'Season 1 Episode 7',
            thumbnail: art('S01E07', '#4b86b4'),
            driveUrl: 'https://drive.google.com/file/d/1i-7e7n7eWk1gjKyPgsu4GixTeKWL3d30/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 7'
          },
          {
            id: 's1e8', season: 1, episode: 8, title: 'Season 1 Episode 8',
            thumbnail: art('S01E08', '#63ace5'),
            driveUrl: 'https://drive.google.com/file/d/17UpM4wTXCMNCkGK5qbf3NoOm3s4qdT9N/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 8'
          },
          {
            id: 's1e9', season: 1, episode: 9, title: 'Season 1 Episode 9',
            thumbnail: art('S01E09', '#1f3a5f'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 9'
          },
          {
            id: 's1e10', season: 1, episode: 10, title: 'Season 1 Episode 10',
            thumbnail: art('S01E10', '#2a4d69'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 10'
          },
          {
            id: 's1e11', season: 1, episode: 11, title: 'Season 1 Episode 11',
            thumbnail: art('S01E11', '#4b86b4'),
            driveUrl: 'https://drive.google.com/file/d/1zUYnm7VbQOgyOzLwBfoDrZcNK0ojGkEN/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 1 Episode 11'
          }
        ]
      },
      {
        number: 2,
        title: 'Season 2',
        episodes: [
          {
            id: 's2e1', season: 2, episode: 1, title: 'Season 2 Episode 1',
            thumbnail: art('S02E01', '#2e7d32'),
            driveUrl: 'https://drive.google.com/file/d/1o9Vvc06FQNsPuW02iEhYbCQLfoHtoZuS/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 1'
          },
          {
            id: 's2e2', season: 2, episode: 2, title: 'Season 2 Episode 2',
            thumbnail: art('S02E02', '#388e3c'),
            driveUrl: 'https://drive.google.com/file/d/1CX3xPYxx1-FqEINCRr_v5Xb9R-viZUIX/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 2'
          },
          {
            id: 's2e3', season: 2, episode: 3, title: 'Season 2 Episode 3',
            thumbnail: art('S02E03', '#4caf50'),
            driveUrl: 'https://drive.google.com/file/d/1KpAUtCxp1HuFwoSyTRMikOlnQQVNWJGA/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 3'
          },
          {
            id: 's2e4', season: 2, episode: 4, title: 'Season 2 Episode 4',
            thumbnail: art('S02E04', '#66bb6a'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 4'
          },
          {
            id: 's2e5', season: 2, episode: 5, title: 'Season 2 Episode 5',
            thumbnail: art('S02E05', '#2e7d32'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 5'
          },
          {
            id: 's2e6', season: 2, episode: 6, title: 'Season 2 Episode 6',
            thumbnail: art('S02E06', '#388e3c'),
            driveUrl: 'https://drive.google.com/file/d/11WbIZSx1OZo1hmt-azXqrR2Gk51jYTG4/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 6'
          },
          {
            id: 's2e7', season: 2, episode: 7, title: 'Season 2 Episode 7',
            thumbnail: art('S02E07', '#4caf50'),
            driveUrl: 'https://drive.google.com/file/d/1i-7e7n7eWk1gjKyPgsu4GixTeKWL3d30/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 7'
          },
          {
            id: 's2e8', season: 2, episode: 8, title: 'Season 2 Episode 8',
            thumbnail: art('S02E08', '#66bb6a'),
            driveUrl: 'https://drive.google.com/file/d/17UpM4wTXCMNCkGK5qbf3NoOm3s4qdT9N/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 8'
          },
          {
            id: 's2e9', season: 2, episode: 9, title: 'Season 2 Episode 9',
            thumbnail: art('S02E09', '#2e7d32'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 9'
          },
          {
            id: 's2e10', season: 2, episode: 10, title: 'Season 2 Episode 10',
            thumbnail: art('S02E10', '#388e3c'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 10'
          },
          {
            id: 's2e11', season: 2, episode: 11, title: 'Season 2 Episode 11',
            thumbnail: art('S02E11', '#4caf50'),
            driveUrl: 'https://drive.google.com/file/d/1zUYnm7VbQOgyOzLwBfoDrZcNK0ojGkEN/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 2 Episode 11'
          }
        ]
      },
      {
        number: 3,
        title: 'Season 3',
        episodes: [
          {
            id: 's3e1', season: 3, episode: 1, title: 'Season 3 Episode 1',
            thumbnail: art('S03E01', '#d81b60'),
            driveUrl: 'https://drive.google.com/file/d/1o9Vvc06FQNsPuW02iEhYbCQLfoHtoZuS/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 1'
          },
          {
            id: 's3e2', season: 3, episode: 2, title: 'Season 3 Episode 2',
            thumbnail: art('S03E02', '#e91e63'),
            driveUrl: 'https://drive.google.com/file/d/1CX3xPYxx1-FqEINCRr_v5Xb9R-viZUIX/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 2'
          },
          {
            id: 's3e3', season: 3, episode: 3, title: 'Season 3 Episode 3',
            thumbnail: art('S03E03', '#f06292'),
            driveUrl: 'https://drive.google.com/file/d/1KpAUtCxp1HuFwoSyTRMikOlnQQVNWJGA/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 3'
          },
          {
            id: 's3e4', season: 3, episode: 4, title: 'Season 3 Episode 4',
            thumbnail: art('S03E04', '#f48fb1'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 4'
          },
          {
            id: 's3e5', season: 3, episode: 5, title: 'Season 3 Episode 5',
            thumbnail: art('S03E05', '#d81b60'),
            driveUrl: 'https://drive.google.com/file/d/1KSf8hjnJdgSUjDnZp1N4fu2N3zVKXyVk/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 5'
          },
          {
            id: 's3e6', season: 3, episode: 6, title: 'Season 3 Episode 6',
            thumbnail: art('S03E06', '#e91e63'),
            driveUrl: 'https://drive.google.com/file/d/11WbIZSx1OZo1hmt-azXqrR2Gk51jYTG4/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 6'
          },
          {
            id: 's3e7', season: 3, episode: 7, title: 'Season 3 Episode 7',
            thumbnail: art('S03E07', '#f06292'),
            driveUrl: 'https://drive.google.com/file/d/1i-7e7n7eWk1gjKyPgsu4GixTeKWL3d30/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 7'
          },
          {
            id: 's3e8', season: 3, episode: 8, title: 'Season 3 Episode 8',
            thumbnail: art('S03E08', '#f48fb1'),
            driveUrl: 'https://drive.google.com/file/d/17UpM4wTXCMNCkGK5qbf3NoOm3s4qdT9N/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 8'
          },
          {
            id: 's3e9', season: 3, episode: 9, title: 'Season 3 Episode 9',
            thumbnail: art('S03E09', '#d81b60'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 9'
          },
          {
            id: 's3e10', season: 3, episode: 10, title: 'Season 3 Episode 10',
            thumbnail: art('S03E10', '#e91e63'),
            driveUrl: 'https://drive.google.com/file/d/1oG27Obmz52Lcy_9W8KXivNEEH0cU_5a9/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 10'
          },
          {
            id: 's3e11', season: 3, episode: 11, title: 'Season 3 Episode 11',
            thumbnail: art('S03E11', '#f06292'),
            driveUrl: 'https://drive.google.com/file/d/1zUYnm7VbQOgyOzLwBfoDrZcNK0ojGkEN/view?usp=drivesdk',
            altVideoUrl: '', subtitleUrl: '', description: 'Shinchan Season 3 Episode 11'
          }
        ]
      }
    ]
  }
];
