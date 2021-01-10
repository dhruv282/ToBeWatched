import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import ItemListing, {RemoveItemButton} from '../components/ItemListing';
import { movie, tvShow } from '../hooks/tmdbAPI';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


type Props = {
  navigation: any;
  navigationPath: string;
  ItemType: string;
  getItemGenre: any;
  addedItemList: any;
  setItemList: any;
}

export default function ItemScreen({navigation, navigationPath, ItemType, getItemGenre, addedItemList, setItemList}: Props) {
  const colorScheme = useColorScheme();

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    }}>
      
      <ItemHeader colorScheme={colorScheme} sortHandler="" filterHandler=""/>
      
      <ItemList colorScheme={colorScheme} ItemType={ItemType} getItemGenre={getItemGenre} addedItemList={addedItemList} setItemList={setItemList}/>
      
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
      }} onPress={() => navigation.navigate(navigationPath)}>
        <Text style={{
          color: Colors[colorScheme].addButton,
          fontSize: 35,
        }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ItemHeader(props: {colorScheme: "light"|"dark", sortHandler: any, filterHandler: any}){
    return(
        <View style={{
            backgroundColor: Colors[props.colorScheme].tint,
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
    );
}

export function ItemList(props: {colorScheme: "light"|"dark", ItemType: string, addedItemList: any, getItemGenre: any, setItemList: any}){
    return(
        <FlatList
        data={props.addedItemList}
        ListEmptyComponent={({ item }) => {
          return (
            <Text style={{
              textAlign: "center",
              marginTop: 250,
              fontSize: 20,
              backgroundColor: Colors[props.colorScheme].background,
              color: Colors[props.colorScheme].searchBar,
            }}>No {props.ItemType} in list</Text>
          );
        }}
        keyExtractor={(item: movie | tvShow) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <ItemListing data={item} scheme={props.colorScheme} getItemGenre={props.getItemGenre} >
                <RemoveItemButton data={item} scheme={props.colorScheme} itemList={props.addedItemList} setItemList={props.setItemList} />
              </ItemListing>
            </View>
          );
        }}
      />
    );
}