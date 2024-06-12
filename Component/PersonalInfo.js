import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PersonalInfo = () => {
    const openLinkedIn = () => {
      Linking.openURL('https://www.linkedin.com/in/mina-nashat/');
    };
  
    const openFacebook = () => {
      Linking.openURL('https://www.facebook.com/100075561351706/posts/pfbid02XBKmfrw8sMNqs1JTrLVQbTKJjVL9bCXA4n3wHWiV1CATss53NgwvJkBLodcDAcZnl/');
    };
  
    const openGithub = () => {
      Linking.openURL('https://github.com/menanashat');
    };
    return (
        <View style={styles.container}>
          {/* Image */}
          <Image source={require('../assets/images.jpeg')} style={styles.image} />
    
          {/* Text */}
          <Text style={styles.name}>Mina Nashat</Text>
          <Text style={styles.position}>Software Engineer</Text>
    
          {/* Icons */}
          <View style={styles.icons}>
            <FontAwesome name="linkedin" size={24} color="white" onPress={() => Linking.openURL('https://www.linkedin.com/in/mina-nashat/')} />
            <FontAwesome name="github" size={24} color="white" onPress={() => Linking.openURL('https://github.com/menanashat')} />
            <FontAwesome name="facebook" size={24} color="white" onPress={() => Linking.openURL('https://www.facebook.com/100075561351706/posts/pfbid02XBKmfrw8sMNqs1JTrLVQbTKJjVL9bCXA4n3wHWiV1CATss53NgwvJkBLodcDAcZnl/')} />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: '#2e2e2e', 
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16, 
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      position: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 8,
      },
      icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
      },
    });
    
    export default PersonalInfo;