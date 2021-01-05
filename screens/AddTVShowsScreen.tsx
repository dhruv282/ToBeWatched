import * as React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Text, View } from '../components/Themed';
import {ItemSearchBar, SearchResultsList, Post} from '../components/searchBar';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors'
import { tvShow, searchTVShow, getTVShowGenre } from '../hooks/tmdbAPI'

export default function AddTVShowsScreen() {
  const [search, setState] = React.useState("")
  const [searchResults, setResults] = React.useState([])
  const colorScheme = useColorScheme();

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
      />
    </View>
  );
}

