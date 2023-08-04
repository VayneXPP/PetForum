import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrowsePostsScreen from '../screens/BrowsePostsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Browse">
      <Tab.Screen name="Browse" component={BrowsePostsScreen} />
      <Tab.Screen name="Shopping" component={ShoppingCartScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
