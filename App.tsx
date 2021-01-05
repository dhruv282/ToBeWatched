import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {movie, tvShow} from './hooks/tmdbAPI';
import AppContext from './components/AppContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  const [addedMovieList, setMovieList] = React.useState<Array<movie>>([]);
  const [addedTVShowList, setTVShowList] = React.useState<Array<tvShow>>([]);

  const listSettings = {
    addedMovieList,
    addedTVShowList,
    setMovieList,
    setTVShowList,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value={listSettings}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}
