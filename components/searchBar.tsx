import * as React from 'react';
import { ListItem, SearchBar } from 'react-native-elements';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import ItemListing from '../components/ItemListing';
import Colors from '../constants/Colors';
import { movie, tvShow } from '../hooks/tmdbAPI';

export function ItemSearchBar(props: {colorScheme: "light" | "dark", placeholder: string, search: string, setState: any, searchItem: any, setResults: any}){
  const [searchBar, setSearchBar] = React.useState<SearchBar | null>(null);
  if(searchBar != null){
    searchBar.focus();
  }
  
  return(
    <SearchBar
      ref={search => setSearchBar(search)}
      platform='default'
      round
      containerStyle={{
        backgroundColor: Colors[props.colorScheme].background,
        borderWidth: 0,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: '7%',
      }}
      inputContainerStyle={{
        backgroundColor: Colors[props.colorScheme].searchBar,
      }}
      inputStyle={{
        color: Colors[props.colorScheme].text,
        backgroundColor: Colors[props.colorScheme].searchBar,
      }}
      placeholder={props.placeholder}
      onChangeText={(text)=>{
        props.setState(text);
        if(text.length >= 3){
          props.searchItem(text).then((res: any) => props.setResults(res));
        } else {
          props.setResults([]);
        }
      }}
      value={props.search}
    />
    );
}


export function SearchResultsList(props: {searchResults: any, colorScheme: "light" | "dark", item: "Movie" | "TV Show", getItemGenre: any, itemList: Array<movie> | Array<tvShow>, setItemList: any}){
    return(
        <FlatList
            data={props.searchResults}
            ListEmptyComponent={({ item }) => {
            return (
                <Text style={{
                textAlign: "center",
                marginTop: '60%',
                fontSize: 20,
                backgroundColor: Colors[props.colorScheme].background,
                color: Colors[props.colorScheme].searchBar,
                }}>No {props.item} Results Found</Text>
            );
            }}

            keyExtractor={(item: movie | tvShow) => item.id.toString()}
            renderItem={({ item }) => {
            return (
              <View>
                <ItemListing data={item} scheme={props.colorScheme} getItemGenre={props.getItemGenre} >
                <SearchResultButton data={item} scheme={props.colorScheme} itemList={props.itemList} setItemList={props.setItemList} />
                </ItemListing>
              </View>
            );
            }}
        />
    );
}

function SearchResultButton(props: {data: movie | tvShow, scheme: "light" | "dark", itemList: Array<movie> | Array<tvShow>, setItemList: any}) {
  return(
    <View style={{
      backgroundColor: Colors[props.scheme].searchBar,
      marginLeft: 345,
      marginTop: -15,
    }}>
    { props.itemList.findIndex((item: movie | tvShow) => item.id === props.data.id) == -1 && (<TouchableOpacity onPress={() => {
      props.setItemList([...props.itemList, props.data]);
    }} style={{
        zIndex: 10,
        backgroundColor: Colors[props.scheme].genreBackground,
        borderWidth: 1,
        borderColor: Colors[props.scheme].tabIconSelected,
        elevation: 5,
        borderRadius: 100,
        height: 25,
        width: 25,
        alignItems: 'center',
      }}>
      <Text style={{
        color: Colors[props.scheme].tabIconSelected,
        fontSize: 25,
        bottom: 6,
      }}>+</Text>
    </TouchableOpacity>)}

    { props.itemList.findIndex((item: movie | tvShow) => item.id === props.data.id) > -1 && (
      <AntDesign name="checkcircleo" size={24} style={{
        zIndex: 10,
        color: Colors[props.scheme].checkMark,
        backgroundColor: Colors[props.scheme].genreBackground,
        borderRadius: 100,
        marginRight: '20%',
      }} />)}
    </View>
  );
}
