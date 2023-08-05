// CreatePostScreen.js
import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../utils/tokenApi.js';  // 根据你的文件路径修改这里


function CreatePostScreen() {
  const [title, setTitle] = useState('');       // title text
  const [content, setContent] = useState('');  //content text
  const [token, setToken] = useState('');     // token
  const navigation = useNavigation();
  const [hasPosted, setHasPosted] = useState(false); // 新增状态

  // 使用 useFocusEffect 钩子来处理离开页面的逻辑
  useFocusEffect(
    useCallback(() => {
      // 从AsyncStorage获取令牌
      const fetchToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        setToken(userToken);
      };
      fetchToken();

      const onLeave = (e) => {
        if (hasPosted || !(title || content)) {
            return; // 如果已成功发布或没有编辑内容，直接返回
        }
        // 阻止默认的导航行为
        e.preventDefault();
        Alert.alert(
            '警告',
            '如果离开，任何编辑好的内容将遗失。',
            [
                { text: '留在此页', style: 'cancel' },
                { text: '确认离开', onPress: clearContent }, // 调用清除内容并导航的函数
            ],
            { cancelable: true }
          );
      };

        // 清除内容并导航到浏览页面的函数
        const clearContent = () => {
        setTitle('');
        setContent('');
        navigation.navigate('Browse');
    };

      // 添加导航监听器
      const unsubscribe = navigation.addListener('beforeRemove', onLeave); // 使用 beforeRemove 事件

      return () => {
        // 清除监听器以避免内存泄露
        unsubscribe();
      };
    }, [navigation, title, content, hasPosted])
  );

   // 处理提交按钮
   const handlePost = async () => { // 注意我们这里把函数改成了异步的
    if (!title && !content) {
      Alert.alert('请输入内容', '标题和正文不能为空。');
      return;
    }
  
    // 构造请求体
    const body = JSON.stringify({
      title,
      content,
    });
  
    try {
        const data = await apiFetch('posts/create', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
        }, navigation);
        setHasPosted(true);
        navigation.navigate('Browse');
      } catch (error) {
        if (error.message === 'Authentication failed') {
          // 如果 token 验证失败，不显示任何错误消息，因为你已经导航到登录页面了
        } else {
          // 对于其他错误，显示一个通用的错误消息
          Alert.alert('出错', '发布帖子时出现了一个问题，请重试。');
        }
      }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="请输入标题"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.inputContent}
        placeholder="请输入正文 (不能超过1000个字符)"
        onChangeText={text => setContent(text.substring(0, 1000))}
        value={content}
        multiline={true}
      />
      <Button title="发布" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputContent: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default CreatePostScreen;
