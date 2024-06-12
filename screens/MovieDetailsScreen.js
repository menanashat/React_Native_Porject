import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image ,TouchableOpacity } from 'react-native';
import axios from 'axios';

const MovieDetailsScreen = ({ route, navigation })=> {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'aa6fc65fcedb7431af3ac2fbe6484cd0';
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  useEffect(() => {
    axios.get(apiUrl, { timeout: 10000 }) 
      .then(response => {
        setMovieDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error("Error fetching movie details from the API:", error);
      });
  }, [apiUrl]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading movie details. Please try again later.</Text>
      </View>
    );
  }
  const handleGoBack = () => {
    navigation.navigate('MovieScreen')
  };
  return (
    
    <View style={styles.container}>
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.detailsContainer}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }} style={styles.poster} />
      <View style={styles.detailsContent}>
        <Text style={styles.title}>{movieDetails.original_title}</Text>
        <Text style={styles.description}>{movieDetails.overview}</Text>
        <Text style={styles.details}>Release Date: {movieDetails.release_date}</Text>
        <Text style={styles.details}>Rating: {movieDetails.vote_average}</Text>

      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  poster: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  detailsContent: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default MovieDetailsScreen;
