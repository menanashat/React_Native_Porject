import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/favoritesSlice';
import { FontAwesome } from '@expo/vector-icons';

const apiKey = "aa6fc65fcedb7431af3ac2fbe6484cd0";
const url = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500/";
const path = "/movie/popular?language=en-US&page=1";
const apiUrl = `${url}${path}&api_key=${apiKey}`;

const MovieScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const likedMovies = useSelector(state => state.movies.likedMovies);

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setMovies(response.data.results);
    }).catch(error => {
      console.error("Error fetching data from the API:", error);
    });
  }, []);

  const handleToggleLike = (movie) => {
    dispatch(toggleLike(movie));
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites', { likedMovies });
  };

  const renderItem = ({ item }) => {
    const isLiked = likedMovies.some(movie => movie.id === item.id);
    return (
      <View style={styles.card}>
        <Image source={{ uri: imgPath + item.poster_path }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={[styles.likeButton, isLiked && styles.likedButton]}
          onPress={() => handleToggleLike(item)}
        >
          <FontAwesome name="heart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.counterContainer} onPress={handleFavoritesPress}>
        <FontAwesome name="heart" size={24} color="white" />
        <Text style={styles.counterText}>{likedMovies.length}</Text>
      </TouchableOpacity>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  container: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
    textAlign: 'center',
  },
  likeButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likedButton: {
    backgroundColor: '#0066cc',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  counterText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
});

export default MovieScreen;
