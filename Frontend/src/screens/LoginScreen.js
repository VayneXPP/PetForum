// LoginScreen.js

import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ButtonComponent from '../components/ButtonComponent'; // 导入自定义按钮组件
import InputComponent from '../components/InputComponent'; // 导入自定义输入框组件
import authStyles from '../styles/authStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config.dev.json';


function LoginScreen({ navigation }) {
  const [phonenum, setPhonenum] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch(`${config.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phonenum, password }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.success) {
          // 存储电话号码
          await AsyncStorage.setItem('userPhone', phonenum);
          // 存储头像URL
          const avatarUrl = `${config.AVATAR_URL}${data.avatar}`;
          await AsyncStorage.setItem('userAvatar', avatarUrl);
          // 存储令牌
          await AsyncStorage.setItem('userToken', data.token); // 假设服务器将令牌作为响应的一部分返回
          navigation.replace('Main');
        } else {
          Alert.alert('Login failed', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred', error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={authStyles.container}>
            <Text style={authStyles.title}>Login</Text>
            <TextInput
            style={authStyles.input}
            placeholder="Phone Number" // 更新占位符
            onChangeText={(text) => setPhonenum(text)}
            value={phonenum}
            />
            <TextInput
            style={authStyles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            />
            <View style={authStyles.buttonContainer}>
            <ButtonComponent title="Login" onPress={handleLogin} />
            <ButtonComponent title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
}


export default LoginScreen;
