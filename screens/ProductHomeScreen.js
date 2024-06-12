import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavoriteScreen from './FavoriteScreen';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductHomeScreen = ({ navigation,route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(cartItems.length);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();
  const favoriteProducts = useSelector(state => state.favorites.favoriteProducts);

  const disableCart = route.params?.disableCart ?? true;
  console.log(disableCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeFromCart = (cartItemId) => {
    
    setCartItems(prevCartItems => prevCartItems.filter(item => item.cartItemId !== cartItemId));
    
    
    setCartItemCount(prevCount => prevCount - 1);
    const updatedCartItems = cartItems.filter(item => item.cartItemId !== cartItemId);
    setCartItems(updatedCartItems);
  
    
    setCartItemCount(updatedCartItems.length);
  };
  const fetchProducts = async () => {
    try {
      setLoadingMore(true);
      const response = await axios.get(`https://retoolapi.dev/5WZh4P/data?page=${page}`);
      const newProducts = response.data;
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const addToCart = (product) => {
    const newItem = { ...product, cartItemId: product.id + '-' + Math.random().toString(36).substr(2, 9) };
    setCartItems(prevCartItems => [...prevCartItems, newItem]);
    setCartItemCount(prevCount => prevCount + 1);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favoriteProducts.find(p => p.id === product.id);
    if (isFavorite) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites', { favoriteProducts });
  };
  
  const navigateToCardProducts = () => {
    navigation.navigate('CardProducts', { cartItems });
  };

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const uniqueProductIds = new Set();
  const uniqueFilteredProducts = [];

  filteredProducts.forEach(product => {
    if (!uniqueProductIds.has(product.id)) {
      uniqueProductIds.add(product.id);
      uniqueFilteredProducts.push(product);
    }
  });
   

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
        <TouchableOpacity
        style={styles.heartIcon}
        onPress={handleFavoritesPress}
      >
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
      <FlatList
        data={uniqueFilteredProducts}
        renderItem={({ item }) => (
          <View style={styles.card}>
             <TouchableOpacity onPress={() => toggleFavorite(item.id)}></TouchableOpacity>
             <Icon
              name={favoriteProducts.some(p => p.id === item.id) ? 'heart' : 'heart-o'}
              size={20}
              color={favoriteProducts.some(p => p.id === item.id) ? 'red' : 'black'}
              onPress={() => toggleFavorite(item)}
              style={styles.favoriteIcon}
            />
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.Name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Button
                title="Add to Cart"
                onPress={() => addToCart(item)}
                disabled={disableCart} // Disable button based on disableCart value
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.productList}
        numColumns={3}
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
      {!disableCart && (
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('CardProducts', { cartItems, setCartItems, setCartItemCount  })}
        >
          <Text style={styles.cartBadge}>{cartItemCount}</Text>
          <Icon name="shopping-basket" size={35} color="black" />
        </TouchableOpacity>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productList: {
      flexGrow: 1,
    },
    card: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      margin: 5,
      position: 'relative', 
    },
    productImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    productInfo: {
      alignItems: 'center',
      marginTop: 10,
    },
    productName: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    productPrice: {
      marginTop: 5,
      textAlign: 'center',
    },
    favoriteIcon: {
      position: 'absolute',
      top: 5,
      left: 5,
    },
    cartIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      padding: 5,
      borderRadius: 50,
    },
    cartBadge: {
      marginRight: 15,
    },
    searchInput: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 2,
      marginBottom: 10,
      paddingLeft: 15,
      borderRadius: 25,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 100, 
        zIndex: 1,
      },
  });
  
  export default ProductHomeScreen;