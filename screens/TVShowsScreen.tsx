import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import ItemListing, {RemoveItemButton} from '../components/ItemListing';
import { TVShowsParamList } from '../types';
import AppContext from '../components/AppContext';
import { tvShow, getTVShowGenre } from '../hooks/tmdbAPI';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

type AddTVShowsScreenNavigationProp = StackNavigationProp<TVShowsParamList, 'TVShowsScreen'>

type Props = {
  navigation: AddTVShowsScreenNavigationProp;
}

export default function TVShowsScreen({navigation}: Props) {
  const listContext = React.useContext(AppContext);
  const colorScheme = useColorScheme();

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    }}>
      <View style={{
        backgroundColor: Colors[colorScheme].tint,
        borderRadius: 9,
        paddingTop: '5%',
        paddingBottom: '5%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
      }}>
        <TouchableOpacity style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20%',
          right: '15%'
        }}
        ><Text>Sort</Text></TouchableOpacity>
        
        <TouchableOpacity style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20%',
          left: '15%'
        }}
        ><Text>Filter</Text></TouchableOpacity>
      </View>
      
      <FlatList
        data={listContext.addedTVShowList}
        ListEmptyComponent={({ item }) => {
          return (
            <Text style={{
              textAlign: "center",
              marginTop: '170%',
              fontSize: 20,
              backgroundColor: Colors[colorScheme].background,
              color: Colors[colorScheme].searchBar,
            }}>No TV Shows in list</Text>
          );
        }}
        keyExtractor={(item: tvShow) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <ItemListing data={item} scheme={colorScheme} getItemGenre={getTVShowGenre} >
                <RemoveItemButton data={item} scheme={colorScheme} itemList={listContext.addedTVShowList} setItemList={listContext.setTVShowList} />
              </ItemListing>
            </View>
          );
        }}
      />
      <TouchableOpacity style={{
        position: 'absolute',
        bottom: 15,
        right: 30,
        backgroundColor: Colors[colorScheme].tint,
        elevation: 5, 
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: 'center',
      }} onPress={() => navigation.navigate('AddTVShowsScreen')}>
        <Text style={{
          color: Colors[colorScheme].addButton,
          fontSize: 35,
        }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
