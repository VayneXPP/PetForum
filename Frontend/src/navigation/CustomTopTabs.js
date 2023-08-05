// CustomTopTabs.js
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowingScreen from '../screens/FollowingScreen';
import RecommendScreen from '../screens/RecommendScreen';

const BrowseTopTabs = createMaterialTopTabNavigator();

function CustomTopTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <BrowseTopTabs.Navigator initialRouteName="Recommend">
          <BrowseTopTabs.Screen name="Following" component={FollowingScreen} />
          <BrowseTopTabs.Screen name="Recommend" component={RecommendScreen} />
        </BrowseTopTabs.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
});

export default CustomTopTabs;
