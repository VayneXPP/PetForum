// tokenApi.js

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function apiFetch(endpoint, options, navigation) {
  const token = await AsyncStorage.getItem('userToken');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,  // 这样就可以在 options 中覆盖默认的头
  };

  const response = await fetch(`http://192.168.0.40:3000/${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!data.success) {
    Alert.alert('错误', data.message);
    if (data.message === 'Authentication failed') {
      // 如果验证失败，清除用户信息并导航到登录页面
      await AsyncStorage.multiRemove(['userToken', 'userPhone', 'userAvatar']);
      navigation.navigate('Login');
    }
    throw new Error(data.message);
  }
  

  return data;
}
