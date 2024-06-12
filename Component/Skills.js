import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const skills = [
    { language: 'JavaScript', skillLevel: 5 },
    { language: 'Python', skillLevel: 4 },
    { language: 'Java', skillLevel: 3 },
    { language: 'C++', skillLevel: 2 },
    { language: 'Ruby', skillLevel: 1 },
  ];
  
  const Skills = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Skills</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skill}>
            <View style={styles.skillContainer}>
              <Text style={styles.language}>{skill.language}</Text>
              <View style={styles.skillBarContainer}>
                <View style={[styles.skillBar, { width: skill.skillLevel * 100 + '%' }]} />
                <Text style={styles.skillLevelText}>{skill.skillLevel}</Text>
              </View>
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
    skill: {
      marginBottom: 16,
    },
    language: {
      fontSize: 18,
      marginBottom: 4,
      color: 'white',
    },
    skillContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    skillBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    skillBar: {
      height: 30,
      backgroundColor: 'gold',
      borderRadius: 20,
      overflow: 'hidden',
    },
    skillLevelText: {
      marginLeft: 4,
      fontSize: 16,
      color: 'white',
    },
  });
  
  
  export default Skills;