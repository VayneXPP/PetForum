import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  // 使用 useFocusEffect 钩子来处理离开页面的逻辑
  useFocusEffect(
    useCallback(() => {
      const onLeave = () => {
        if (title || content) {
          Alert.alert(
            '警告',
            '如果离开，任何编辑好的内容将遗失。',
            [
              { text: '留在此页', style: 'cancel' },
              { text: '确认离开', onPress: () => { setTitle(''); setContent(''); } },
            ],
            { cancelable: true }
          );
        }
      };

      // 添加导航监听器
      const unsubscribe = navigation.addListener('blur', onLeave);

      return () => {
        // 清除监听器以避免内存泄露
        unsubscribe();
      };
    }, [navigation, title, content])
  );

  // 处理提交按钮
  const handlePost = () => {
    // 这里你可以添加向后端发送数据的代码
    // ...

    // 提交后返回到 Browse 的 recommend 页面
    navigation.navigate('Browse');
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
