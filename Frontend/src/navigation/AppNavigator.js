// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import CreatePostScreen from '../screens/CreatePostScreen'; // 导入新组件
import PostDetailScreen from '../screens/PostDetailScreen';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} // 这行代码隐藏了顶部标题
      />
      <Stack.Screen name="CreatePost" 
      component={CreatePostScreen} 
      options={{headerBackTitle: '' }} // 设置headerBackTitle 为空字符串
      />
      <Stack.Screen 
        name="PostDetailScreen" 
        component={PostDetailScreen} 
        options={{ headerTitle: '', headerBackTitle: '' }} // 设置 headerTitle和headerBackTitle 为空字符串
      />

    </Stack.Navigator>
  );
}

export default AppNavigator;
