import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CreatePostButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('CreatePost')}
    />
  );
}

export default CreatePostButton;
