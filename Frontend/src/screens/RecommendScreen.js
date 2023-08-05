// RecommendScreen.js
import React, { useState, useEffect } from 'react';
import { Text, Image, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import { apiFetch } from '../utils/tokenApi.js';
import { useNavigation } from '@react-navigation/native';

function RecommendScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);  

  // 点击某个post的事件
  const handlePostClick = (item) => {
    navigation.navigate('PostDetailScreen', { post: item });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response = await axios.get(`http://192.168.0.40:3000/posts/browse?page=${page}`);
    setPosts([...posts, ...response.data.posts]);
    setPage(page + 1);
  };
  return (
    <FlatGrid
      itemDimension={130}
      data={posts}
      renderItem={({ item }) => (
        <View onTouchEnd={() => handlePostClick(item)}>
          {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}
          <Image source={{uri: `http://192.168.0.40:8080/postImages/${item.image}`}} style={{ width: 175, height: 220 ,marginTop:15,marginBottom:5}}/>
          <Text>{item.title}</Text>
        </View>
      )}
      keyExtractor={item => item.postID.toString()}
      onEndReached={loadPosts}
      onEndReachedThreshold={0.1}
    />
  );
}

export default RecommendScreen;
