import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const languages = ['Arabic', 'English', 'Deutsch', 'French'];

const Languages = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Languages</Text>
          {languages.map((language, index) => (
            <View key={index} style={styles.language}>
              <Text style={styles.languageText}>{language}</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={24} color="gold" />
                ))}
              </View>
            </View>
          ))}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
      },
      language: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
      },
      languageText: {
        fontSize: 18,
        marginRight: 8,
        color: 'white', 
      },
      stars: {
        flexDirection: 'row',
      },
    });
    
    export default Languages;
