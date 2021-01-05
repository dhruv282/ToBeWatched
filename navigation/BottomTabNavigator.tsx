import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MoviesScreen from '../screens/MoviesScreen';
import AddMoviesScreen from '../screens/AddMoviesScreen';
import TVShowsScreen from '../screens/TVShowsScreen';
import AddTVShowsScreen from '../screens/AddTVShowsScreen';
import { BottomTabParamList, MoviesParamList, TVShowsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Movies"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Movies"
        component={MoviesNavigator}
        options={{
          tabBarIcon: ({ color }) => <MovieTabBarIcon name="ios-code" color={color} />,
          title: "Movies",
        }}
      />
      <BottomTab.Screen
        name="TVShows"
        component={TVShowsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TVShowsTabBarIcon name="ios-code" color={color} />,
          title: "TV Shows",
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function MovieTabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons name="movie-open" size={24} color={props.color} />;
}

function TVShowsTabBarIcon(props: { name: string; color: string }) {
  return <Ionicons name="md-tv" size={24} color={props.color} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MoviesStack = createStackNavigator<MoviesParamList>();

function MoviesNavigator() {
  return (
    <MoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <MoviesStack.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{ headerTitle: 'Movies' }}
      />
      <MoviesStack.Screen
        name="AddMoviesScreen"
        component={AddMoviesScreen}
        options={{ headerTitle: 'Movies' }}
      />
    </MoviesStack.Navigator>
  );
}

const TVShowsStack = createStackNavigator<TVShowsParamList>();

function TVShowsNavigator() {
  return (
    <TVShowsStack.Navigator screenOptions={{ headerShown: false }}>
      <TVShowsStack.Screen
        name="TVShowsScreen"
        component={TVShowsScreen}
        options={{ headerTitle: 'TV Shows' }}
      />
      <TVShowsStack.Screen
        name="AddTVShowsScreen"
        component={AddTVShowsScreen}
        options={{ headerTitle: 'TV Shows' }}
      />
    </TVShowsStack.Navigator>
  );
}
