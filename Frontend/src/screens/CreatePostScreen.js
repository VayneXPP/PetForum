// CreatePostScreen.js
import React, { useState, useCallback, useContext } from 'react'; // 新增引入useContext
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../utils/tokenApi.js';
import { AppContext } from '../context.js';  // 根据你的文件路径修改这里

function CreatePostScreen() {
  const { postDraft, setPostDraft } = useContext(AppContext);
  const { title, content } = postDraft;
  const [token, setToken] = useState('');     
  const navigation = useNavigation();
  const [hasPosted, setHasPosted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        setToken(userToken);
      };
      fetchToken();

      const onLeave = (e) => {
        if (hasPosted || !(title || content)) {
          return;
        }
        e.preventDefault();
        Alert.alert(
          '警告',
          '如果离开，任何编辑好的内容将遗失。',
          [
            { text: '留在此页', style: 'cancel' },
            { text: '确认离开', onPress: clearContent },
          ],
          { cancelable: true }
        );
      };

      const clearContent = () => {
        setPostDraft({ title: '', content: '' }); // 更改为使用setPostDraft
        navigation.navigate('Browse');
      };

      const unsubscribe = navigation.addListener('beforeRemove', onLeave); 

      return () => {
        unsubscribe();
      };
    }, [navigation, title, content, hasPosted])
  );

  const handlePost = async () => {
    if (title.length > 25) {
      Alert.alert('字数超出限制', '标题不能超过25个字符。');
      return;
    }
  
    if (content.length > 1000) {
      Alert.alert('字数超出限制', '正文不能超过1000个字符。');
      return;
    }
  
    if (!title && !content) {
      Alert.alert('请输入内容', '标题和正文不能为空。');
      return;
    }
  
    try {
      const data = await apiFetch('posts/create', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      }, navigation);
      setHasPosted(true);
      setPostDraft({ title: '', content: '' }); // 清空内容
      navigation.navigate('Browse');
    } catch (error) {
      if (error.message === 'Authentication failed') {
        setPostDraft({ title: '', content: '' }); // 更改为使用setPostDraft
      } else {
        Alert.alert('出错', '发布帖子时出现了一个问题，请重试。');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="请输入标题"
        onChangeText={text => setPostDraft({ ...postDraft, title: text })} // 更改为使用setPostDraft
        value={title}
      />
      <TextInput
        style={styles.inputContent}
        placeholder="请输入正文 (不能超过1000个字符)"
        onChangeText={text => setPostDraft({ ...postDraft, content: text.substring(0, 1000) })} // 更改为使用setPostDraft
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
