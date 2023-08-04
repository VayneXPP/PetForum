// src/styles/authStyles.js
import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // 修改为'flex-start'使元素靠近屏幕顶部
    paddingTop: 100, // 可以调整这个值来改变距离顶部的距离
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default authStyles;
