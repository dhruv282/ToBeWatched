import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import ItemScreen from '../components/ItemScreen';
import { MoviesParamList } from '../types';
import AppContext from '../components/AppContext';
import { getMovieGenre } from '../hooks/tmdbAPI';

type AddMoviesScreenNavigationProp = StackNavigationProp<MoviesParamList, 'MoviesScreen'>

type Props = {
  navigation: AddMoviesScreenNavigationProp;
}

export default function MoviesScreen({navigation}: Props) {
  const listContext = React.useContext(AppContext);

  return (
    <ItemScreen 
      navigation={navigation}
      navigationPath={"AddMoviesScreen"}
      ItemType={"Movies"}
      getItemGenre={getMovieGenre}
      addedItemList={listContext.addedMovieList}
      setItemList={listContext.setMovieList}
    />
  );
}
