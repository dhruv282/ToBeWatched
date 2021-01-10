import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { movie, tvShow } from '../hooks/tmdbAPI';

export default function ItemListing(props: {data: movie | tvShow, scheme: "light" | "dark", getItemGenre: any, children: any}){
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

        {props.children}

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
            marginTop: -125,
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

export function RemoveItemButton(props: {data: movie | tvShow, scheme: "light" | "dark", itemList: Array<movie> | Array<tvShow>, setItemList: any}) {
    return(
        <View style={{
          backgroundColor: Colors[props.scheme].searchBar,
          marginLeft: 345,
          marginTop: -15,
        }}>
          <MaterialIcons size={24} name="cancel" onPress={() => {
            let arr = props.itemList.filter((item: movie | tvShow) => item.id !== props.data.id)
            props.setItemList(arr);
            }} style={{
                zIndex: 10,
                color: Colors[props.scheme].tabIconSelected,
                backgroundColor: Colors[props.scheme].genreBackground,
                elevation: 5,
                borderRadius: 100,
                height: 25,
                width: 25,
                alignItems: 'center',
            }}/>
            
        </View>
    );
}