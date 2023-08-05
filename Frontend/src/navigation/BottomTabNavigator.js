// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import BrowsePostsScreen from '../screens/BrowsePostsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTopTabs from './CustomTopTabs'; // 导入自定义组件

const Tab = createBottomTabNavigator();

function CustomCreateButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 55,
        borderRadius: 35,
        backgroundColor: 'blue',
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

function BottomTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Browse"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Browse') {
            icon = focused ? require('../../../assets/icons/act_home.png') : require('../../../assets/icons/inact_home.png');
          } else if (route.name === 'Shopping') {
            icon = focused ? require('../../../assets/icons/act_cart.png') : require('../../../assets/icons/inact_cart.png');
          } else if (route.name === 'CreatePost') {
            icon = null; // 这个屏幕的图标为空
          } else if (route.name === 'Messages') {
            icon = focused ? require('../../../assets/icons/act_chat.png') : require('../../../assets/icons/inact_chat.png');
          } else if (route.name === 'Profile') {
            icon = focused ? require('../../../assets/icons/act_user.png') : require('../../../assets/icons/inact_user.png');
          }

          return <Image source={icon} style={{ width: 20, height: 20 }} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Browse" component={CustomTopTabs} options={{ headerShown: false }} />
      <Tab.Screen name="Shopping" component={ShoppingCartScreen} />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarButton: (props) => (
            <CustomCreateButton onPress={() => navigation.navigate('CreatePost')}>
              <Image source={require('../../../assets/icons/add.png')} style={styles.icon} />
            </CustomCreateButton>
          ),
        }}
      />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
    container: {
      width: 5, // 调整为较小的值
      height: 5, // 调整为较小的值
      borderRadius: 15, // 保持宽度和高度的一半，以保持圆形外观
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e8e8e8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
    },
    icon: {
      width: 55, // 调整为较小的值
      height: 55, // 调整为较小的值
    },
  });
  
export default BottomTabNavigator;
