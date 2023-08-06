// RecommendScreen.js
import React, { useState, useEffect } from 'react';
import { Text, Image, View, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import { apiFetch } from '../utils/tokenApi.js';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

function RecommendScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);  

  // 点击某个post的事件
  const handlePostClick = (item) => {
    navigation.navigate('PostDetailScreen', { post: item });
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  // 顶部下拉刷新
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setPosts([]); // 清空现有帖子
    await loadPosts(1); // 重新加载第一页的帖子
    setRefreshing(false);
  };
  
  // 底部下滑加载
  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);
      await loadPosts(page + 1); // 加载下一页的帖子
      setPage(page + 1);
      setLoading(false);
    }
  };

  const loadPosts = async (currentPage) => {
    const response = await axios.get(`http://192.168.0.40:3000/posts/browse?page=${currentPage}`);
    setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
};

  return (
<View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
    <FlatGrid
        itemDimension={130}
        data={posts}
        renderItem={({ item, index }) => (
            <TouchableOpacity 
                onPress={() => handlePostClick(item)} 
                style={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: 'center', // 居中内容
                    alignItems: 'center'     // 居中内容
                }}
            >
                <Image 
                    source={{uri: `http://192.168.0.40:8080/postImages/${item.image}`}}
                    style={{
                        width: index === 0 ? 160 : 175,
                        height: index === 0 ? 190 : 220,
                        marginTop: index % 2 === 0 ? 30 : 15,
                        marginBottom: 5
                    }}
                    resizeMode="cover"
                />
                {/* 为Text添加一个包裹View */}
                <View style={{ alignSelf: 'stretch', alignItems: 'flex-start', width: '100%' }}>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )}
        keyExtractor={item => item.postID.toString()}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
    />
</View>
);

}

export default RecommendScreen;
