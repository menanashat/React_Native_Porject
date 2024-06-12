import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';


import PersonalInfo from './Component/PersonalInfo';
import AgeInfo from './Component/AgeInfo';
import Languages from './Component/Languages';
import Skills from './Component/Skills';
import DownloadCVButton from './Component/DownloadCVButton';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MovieScreen from './screens/MovieScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ToDoScreen from './screens/ToDoScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ProductHomeScreen from './screens/ProductHomeScreen';
import CardProductsScreen from './screens/CardProductsscreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ProductHome" component={ProductHomeScreen} />
      <Stack.Screen name="CardProducts" component={CardProductsScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="ToDo" component={ToDoScreen} />
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        console.log('User is already logged in');
      }
    };
    checkUser();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ProductHome">
          <Drawer.Screen name="ProductHome" component={MainStackNavigator} />
          <Drawer.Screen name="Movies" component={MovieScreen} />
          <Drawer.Screen name="ToDo" component={ToDoScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', 
  },
  line: {
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 16,
  },
  componentContainer: {
    backgroundColor: '#2e2e2e', 
    padding: 16,
    borderRadius: 8,
  },
});
