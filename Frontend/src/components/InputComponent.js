import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function InputComponent({ style, ...props }) {
  return (
    <TextInput  style={[styles.container, style]}>
      <TextInput {...props} style={styles.input} />
    </TextInput >
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default InputComponent;
