import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const FavoriteScreen = ({ route }) => {
  const { favoriteProducts } = route.params;
  const dispatch = useDispatch();
  const [products, setProducts] = useState(favoriteProducts);

  const handleRemoveFavorite = (product) => {
    dispatch(removeFavorite(product.id)); 
    setProducts(prevProducts => prevProducts.filter(item => item.id !== product.id)); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites Screen</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.Name}</Text>
              <Text style={styles.productDescription}>{item.Description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default FavoriteScreen;
