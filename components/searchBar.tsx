import * as React from 'react';
import { ListItem, SearchBar } from 'react-native-elements';
import { FlatList, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
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


export function SearchResultsList(props: {searchResults: any, colorScheme: "light" | "dark", item: "Movie" | "TV Show", getItemGenre: any}){
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
                <Post data={item} scheme={props.colorScheme} getItemGenre={props.getItemGenre} />
            );
            }}
        />
    );
}


export function Post(props: {data: movie | tvShow, scheme: "light" | "dark", getItemGenre: any}){
    let overview = props.data.overview;
    if(overview.length > 250){
      overview = overview.substring(0,250) + "...";
    }
    
    let title = ""
    if("title" in props.data){
        title = props.data.title;
        if(title.length > 30){
        title = title.substring(0,30) + "...";
        }
    } else if("name" in props.data){
        title = props.data.name;
        if(title.length > 30){
        title = title.substring(0,30) + "...";
        }
    }
  
    let lang = props.data.original_language;
    lang = lang.toUpperCase();
  
    let [genre, setGenre] = React.useState("");
    props.getItemGenre(props.data.genre_ids[0]).then((res: string | undefined='') => setGenre(res));
    return(
      <View style={{
        borderRadius: 10,
        margin: '2%',
        backgroundColor: Colors[props.scheme].searchBar,
      }}>
  
        <Text style={{
          marginLeft: 115,
          marginTop: 5,
          color: Colors[props.scheme].text,
          fontSize: 13,
          fontWeight: "bold",
          flexDirection: 'row',
      
        }}>{title}</Text>
  
        <Text style={{
          marginTop: 5,
          marginLeft: 115,
          marginRight: '63%',
          backgroundColor: Colors[props.scheme].searchBackground,
          color: Colors[props.scheme].lang,
          borderWidth: 1,
          borderColor: Colors[props.scheme].lang,
          paddingLeft: "1.5%",
          fontSize: 10,
        }}>{lang}</Text>
  
        <Text style={{
          color: Colors[props.scheme].text,
          fontSize: 13,
          fontWeight: "bold",
          marginLeft: 115,
          marginTop: 5,
        }}>Release Date</Text>
  
        <Text style={{
          color: Colors[props.scheme].text,
          fontSize: 11,
          marginRight: "1%",
          marginLeft: 115,
          marginBottom: 10,
        }}>{props.data.release_date}</Text>
  
        {
          genre.length > 0 && (<Text style={{
            fontSize: 13,
            marginLeft: 115,
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors[props.scheme].tabIconSelected,
            color: Colors[props.scheme].text,
            backgroundColor: Colors[props.scheme].genreBackground,
            textAlign: "center",
            alignItems: "center",
            paddingLeft: 5,
            paddingRight: 5,
            alignSelf: 'flex-start',
          }}>{genre}</Text>)
        }
  
        {
          genre.length == 0 && (<Text style={{
            fontSize: 13,
            marginLeft: 115,
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors[props.scheme].searchBar,
            color: Colors[props.scheme].text,
            backgroundColor: Colors[props.scheme].searchBar,
            textAlign: "center",
            alignItems: "center",
            paddingLeft: 5,
            paddingRight: 5,
            alignSelf: 'flex-start',
          }}>{genre}</Text>)
        }
  
        <Image
          source={props.data.backdrop_path ? {uri: `https://image.tmdb.org/t/p/w500${props.data.backdrop_path}`} : require('../assets/images/icon.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            marginLeft: 5,
            marginTop: -115,
            borderWidth: 2,
            borderColor: Colors[props.scheme].imgBorder,
          }}
        />
        
        <Text style={{
          color: Colors[props.scheme].text,
          fontSize: 13,
          fontWeight: "bold",
          marginLeft: 5,
          marginTop: 5,
        }}>Overview</Text>
  
        <Text style={{
          color: Colors[props.scheme].text,
          fontSize: 11,
          marginRight: "1%",
          marginLeft: 5,
          marginBottom: 10,
        }}>{overview}</Text>
  
      </View>
    );
  }
  