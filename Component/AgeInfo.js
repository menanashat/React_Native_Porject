import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AgeInfo = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Age: 23</Text>
          <Text style={styles.text}>ID: 100</Text>
          <Text style={styles.text}>Freelance: AI Engineer</Text>
          <Text style={styles.text}>Address: Sohage</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        marginVertical: 4,
        color: 'white', 
      },
    });
    
    export default AgeInfo;