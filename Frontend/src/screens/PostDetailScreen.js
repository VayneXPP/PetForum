// PostDetailScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';

function PostDetailScreen({ route, navigation }) {
  const { post } = route.params; // 这里的 `post` 就是你在 `BrowsePostsScreen` 中传递的帖子对象

  // 然后你就可以使用 `post` 来渲染帖子的详细信息了
  return (
    <View>
      <Image source={{uri: `http://192.168.0.40:8080/postImages/${post.image}`}} style={{ width: 300, height: 300 }}/>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
}

export default PostDetailScreen;
