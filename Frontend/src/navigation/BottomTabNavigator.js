// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import BrowsePostsScreen from '../screens/BrowsePostsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BrowseTabs from './BrowseStack'; // 导入BrowseStack
import CreatePostButton from '../components/CreatePostButton'; // 导入自定义组件
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Browse"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Browse') {
            icon = focused
              ? require('../../../assets/icons/act_home.png')
              : require('../../../assets/icons/inact_home.png');
          } else if (route.name === 'Shopping') {
            icon = focused
              ? require('../../../assets/icons/act_cart.png')
              : require('../../../assets/icons/inact_cart.png');
          }else if (route.name === 'CreatePost') {
            icon = focused
              ? require('../../../assets/icons/add.png')
              : require('../../../assets/icons/add.png');
          }else if (route.name === 'Messages') {
            icon = focused
              ? require('../../../assets/icons/act_chat.png')
              : require('../../../assets/icons/inact_chat.png');
          }else if (route.name === 'Profile') {
            icon = focused
              ? require('../../../assets/icons/act_user.png')
              : require('../../../assets/icons/inact_user.png');
          }


          return <Image source={icon} style={{ width: 20, height: 20 }} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Browse"
        component={BrowseTabs} // 使用BrowseStack而不是BrowsePostsScreen
        options={{
       //   headerShown: false, // 隐藏标题
        }}
      />

      
      <Tab.Screen
        name="Shopping"
        component={ShoppingCartScreen}
        options={({ focused }) => ({
          tabBarLabelStyle: {
            fontWeight: focused ? 'bold' : 'normal',
          },
        })}
      />
      {/* 为其他屏幕重复上述设置 */}
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
