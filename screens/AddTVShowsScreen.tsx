import * as React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { View } from '../components/Themed';
import {ItemSearchBar, SearchResultsList} from '../components/searchBar';
import useColorScheme from '../hooks/useColorScheme';
import { searchTVShow, getTVShowGenre } from '../hooks/tmdbAPI';
import AppContext from '../components/AppContext';

export default function AddTVShowsScreen() {
  const [search, setState] = React.useState("")
  const [searchResults, setResults] = React.useState([])
  const colorScheme = useColorScheme();
  const listContext = React.useContext(AppContext);

  return (
    <View style={{height: "100%"}}>
      <ItemSearchBar
        colorScheme={colorScheme}
        placeholder={"Search TV Show"}
        search={search}
        setState={setState}
        searchItem={searchTVShow}
        setResults={setResults}
      />

      <SearchResultsList 
        searchResults={searchResults}
        colorScheme={colorScheme}
        item={"TV Show"}
        getItemGenre={getTVShowGenre}
        itemList={listContext.addedTVShowList}
        setItemList={listContext.setTVShowList}
      />
    </View>
  );
}

