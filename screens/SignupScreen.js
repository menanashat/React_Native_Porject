import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateAndSignup = async () => {
    let valid = true;

    if (username.length < 3) {
        alert('Invalid Username Username must be at least 3 characters long.');
      valid = false;
    }

    if (password.length < 8) {
        alert('Invalid Password Password must be at least 8 characters long.');
      valid = false;
    }

    if (password !== confirmPassword) {
        alert('Password Mismatch', 'Passwords do not match.');
      valid = false;
    }

    if (valid) {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const userExists = storedUsers.find(user => user.username === username);

      if (userExists) {
        alert('Signup Failed Username already exists.');
      } else {
        const newUser = { username, password };
        storedUsers.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
        alert(`Signup Successful! Welcome ${username}`);
        navigation.navigate('Login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
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
      
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Signup" onPress={validateAndSignup} style={styles.button} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Go to Login" onPress={() => navigation.navigate('Login')} style={styles.button} />
        </View>
        <View style={styles.buttonWrapper}>
        <Button title="Go to Product Home" onPress={() => navigation.navigate('ProductHome', { disableCart: true  })} />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
        width: '10%',
        marginTop: 12,
      },
      buttonWrapper: {
        marginBottom: 12,
        borderRadius: 20,
        overflow: 'hidden',
      },
      button: {
        width: '50%',
        borderRadius: 20,
      },
    });