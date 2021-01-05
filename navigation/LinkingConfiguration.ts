import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Movies: {
            screens: {
              MoviesList: 'MoviesList',
              MoviesSearch: 'AddMovies',
            },
          },
          TVShows: {
            screens: {
              TVShowsList: 'TVShowsList',
              TVShowsSearch: 'AddTVShows',
            },
          },
        },
      },
    },
  },
};
