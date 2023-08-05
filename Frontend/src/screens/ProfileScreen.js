// ProfileScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context.js';  // 根据你的文件路径修改这里


function ProfileScreen({ navigation }) {
  const { setPostDraft } = useContext(AppContext);
  const [phonenum, setPhonenum] = useState('');
  const [avatar, setAvatar] = useState('http://192.168.0.40:8080/avatar1.jpg'); // 定义一个状态来跟踪avatar

  // 从存储中获取电话号码和头像URL
  useEffect(() => {
    const getProfileData = async () => {
      const phone = await AsyncStorage.getItem('userPhone');
      const avatarUrl = await AsyncStorage.getItem('userAvatar'); // 获取头像URL
      setPhonenum(phone);
      if (avatarUrl && typeof avatarUrl === 'string') {
        setAvatar(avatarUrl); // 如果存储中有头像URL，则设置头像URL
      }
    };
  
    getProfileData();
  }, []);
  


  // 注销功能
  const handleLogout = async () => {
    // 清空帖子草稿
    setPostDraft({ title: '', content: '' });
    await AsyncStorage.multiRemove(['userToken', 'userPhone', 'userAvatar']);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>

   <Image source={{ uri: avatar }} style={styles.avatar} />


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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  phoneText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
