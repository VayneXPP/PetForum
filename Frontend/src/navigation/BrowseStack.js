// BrowseStack.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowingScreen from '../screens/FollowingScreen';
import RecommendScreen from '../screens/RecommendScreen';

const BrowseTopTabs = createMaterialTopTabNavigator();

function BrowseTabs() {
  return (
    <BrowseTopTabs.Navigator initialRouteName="Recommend">
      <BrowseTopTabs.Screen name="Following" component={FollowingScreen} />
      <BrowseTopTabs.Screen name="Recommend" component={RecommendScreen} />
    </BrowseTopTabs.Navigator>
  );
}

export default BrowseTabs;
