import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Dimensions, Button, Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CardProductsScreen = ({ route }) => {
  const { cartItems: initialCartItems = [], setCartItems, setCartItemCount } = route.params || {};
  const [cartItems, setLocalCartItems] = useState(initialCartItems);
  const [editStates, setEditStates] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState(''); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total);
  };

  const deleteItem = (cartItemId) => {
    const indexToRemove = cartItems.findIndex(item => item.cartItemId === cartItemId);
    if (indexToRemove !== -1) {
      setShowDeleteConfirmation(false); 
      const updatedItems = [...cartItems];
      updatedItems.splice(indexToRemove, 1);
      setLocalCartItems(updatedItems);
      setCartItems(updatedItems);  
      setCartItemCount(updatedItems.length);  
    }
  };

  const confirmDelete = (cartItemId) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(cartItemId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const updateItem = (cartItemId) => {
    if (!editStates[cartItemId]) {
      setEditStates(prevStates => ({
        ...prevStates,
        [cartItemId]: true,
      }));

      const selectedItem = cartItems.find(item => item.cartItemId === cartItemId);
      setUpdatedName(selectedItem.Name);
      setUpdatedPrice(selectedItem.price.toString());
      setUpdatedDescription(selectedItem.Description);
      setUpdatedDetails(selectedItem.Details); 
    }
  };

  const saveChanges = (cartItemId) => {
    const updatedItems = cartItems.map(item => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          Name: updatedName || item.Name,
          price: updatedPrice || item.price,
          Description: updatedDescription || item.Description,
          Details: updatedDetails || item.Details, 
        };
      }
      return item;
    });
    setLocalCartItems(updatedItems);
    setCartItems(updatedItems);  
    setEditStates(prevStates => ({
      ...prevStates,
      [cartItemId]: false,
    }));
  };

  const purchaseItems = () => {
    setShowPurchaseConfirmation(true);
  };

  const confirmPurchase = () => {
    setLocalCartItems([]);
    setCartItems([]);
    route.params.setCartItemCount(0);
    setTotalPrice(0);
    setShowPurchaseConfirmation(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {editStates[item.cartItemId] ? (
        <View style={styles.editContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={updatedName}
            onChangeText={text => setUpdatedName(text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={updatedPrice}
            onChangeText={text => setUpdatedPrice(text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={updatedDescription}
            onChangeText={text => setUpdatedDescription(text)}
          />
          <TextInput
            placeholder="Details"
            style={styles.input}
            value={updatedDetails}
            onChangeText={text => setUpdatedDetails(text)}
          />
          <Button title="Save" onPress={() => saveChanges(item.cartItemId)} />
        </View>
      ) : (
        <>
          <Text style={styles.name}>{item.Name}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.description}>{item.Description}</Text>
          <Text style={styles.details}>{item.Details}</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Delete" onPress={() => confirmDelete(item.cartItemId)} />
            <Button title="Update" onPress={() => updateItem(item.cartItemId)} />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.cartItemId}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.purchaseButton} onPress={purchaseItems}>
          <Text style={styles.purchaseButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showDeleteConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button title="Cancel" onPress={cancelDelete} />
              <Button title="Delete" onPress={() => deleteItem(itemToDelete)} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showPurchaseConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPurchaseConfirmation(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to purchase all items?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button title="Cancel" onPress={() => setShowPurchaseConfirmation(false)} />
              <Button title="Purchase" onPress={confirmPurchase} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: screenWidth / 3 - 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  details: {
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  purchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CardProductsScreen;
