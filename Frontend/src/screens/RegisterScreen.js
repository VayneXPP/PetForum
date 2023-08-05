// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import authStyles from '../styles/authStyles';

function RegisterScreen({ navigation }) {
  const [phonenum, setphonenum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    fetch('http://192.168.0.40:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phonenum, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Success', 'Registration successful', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
          ]);
        } else {
          Alert.alert('Registration failed', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred', error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Register</Text>
        <TextInput
          style={authStyles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setphonenum(text)}
          value={phonenum}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={authStyles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        <View style={authStyles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;