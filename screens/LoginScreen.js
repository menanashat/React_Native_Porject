import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        navigation.navigate('Login'); 
      }
    };
    checkUser();
  }, []);

  const validateAndLogin = async () => {
    const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const userExists = storedUsers.find(user => user.username === username);

    if (userExists) {
      if (userExists.password === password) {
        await AsyncStorage.setItem('user', JSON.stringify(userExists));
        alert(`Login Successful! Welcome ${username}`);
        navigation.navigate('ProductHome', { disableCart: false }); 
      } else {
        alert('Invalid password. Please try again.');
      }
    } else {
      setNotFoundMessage('User not found. Please sign up.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {notFoundMessage ? <Text style={styles.errorMessage}>{notFoundMessage}</Text> : null}
      {invalidCredentialsMessage ? <Text style={styles.errorMessage}>{invalidCredentialsMessage}</Text> : null}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={validateAndLogin} style={styles.button} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} style={styles.button} />
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center', 
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 20, 
  },
  errorMessage: {
    color: 'red',
    marginBottom: 8,
    width: '70%', 
    textAlign: 'center', 
  },
  buttonContainer: {
    width: '50%', 
    marginTop: 12,
  },
  buttonWrapper: {
    marginBottom: 12, 
    borderRadius: 20, 
    overflow: 'hidden', 
  },
  button: {
    width: '100%',
    borderRadius: 20, 
  },
});
