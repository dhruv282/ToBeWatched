import * as React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import { TVShowsParamList } from '../types';

type AddTVShowsScreenNavigationProp = StackNavigationProp<TVShowsParamList, 'TVShowsScreen'>

type Props = {
  navigation: AddTVShowsScreenNavigationProp;
}

export default function TVShowsScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No TV Shows in list</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTVShowsScreen')}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#737874',
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    backgroundColor: '#b02525',
    elevation: 5,    
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
