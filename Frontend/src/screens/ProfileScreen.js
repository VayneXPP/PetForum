import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ForumScreen({ navigation }) {
  const [phonenum, setPhonenum] = useState('');

  // 从存储中获取电话号码
  useEffect(() => {
    const getPhoneNumber = async () => {
      const phone = await AsyncStorage.getItem('userPhone');
      setPhonenum(phone);
    };

    getPhoneNumber();
  }, []);

  // 注销功能
  const handleLogout = async () => {
    // 删除存储的电话号码
    await AsyncStorage.removeItem('userPhone');
    // 返回登录页面
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phoneText}>Phone Number: {phonenum}</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ForumScreen;
