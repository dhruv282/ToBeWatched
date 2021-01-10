import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import ItemScreen from '../components/ItemScreen';
import { TVShowsParamList } from '../types';
import AppContext from '../components/AppContext';
import { getTVShowGenre } from '../hooks/tmdbAPI';

type AddTVShowsScreenNavigationProp = StackNavigationProp<TVShowsParamList, 'TVShowsScreen'>

type Props = {
  navigation: AddTVShowsScreenNavigationProp;
}

export default function TVShowsScreen({navigation}: Props) {
  const listContext = React.useContext(AppContext);

  return (
    <ItemScreen 
      navigation={navigation}
      navigationPath={"AddTVShowsScreen"}
      ItemType={"TV Shows"}
      getItemGenre={getTVShowGenre}
      addedItemList={listContext.addedTVShowList}
      setItemList={listContext.setTVShowList}
    />
  );
}
