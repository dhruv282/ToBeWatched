import * as React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { View } from '../components/Themed';
import {ItemSearchBar, SearchResultsList, Post} from '../components/searchBar';
import useColorScheme from '../hooks/useColorScheme';
import { searchMovie, getMovieGenre } from '../hooks/tmdbAPI';
import AppContext from '../components/AppContext';

export default function AddMoviesScreen() {
  const [search, setState] = React.useState("")
  const [searchResults, setResults] = React.useState([])
  const colorScheme = useColorScheme();
  const listContext = React.useContext(AppContext);
  
  return (
    <View style={{height: "100%"}}>
      <ItemSearchBar
        colorScheme={colorScheme}
        placeholder={"Search Movies"}
        search={search}
        setState={setState}
        searchItem={searchMovie}
        setResults={setResults}
      />

      <SearchResultsList 
        searchResults={searchResults}
        colorScheme={colorScheme}
        item={"Movie"}
        getItemGenre={getMovieGenre}
        itemList={listContext.addedMovieList}
        setItemList={listContext.setMovieList}
      />
    </View>
  );
}
