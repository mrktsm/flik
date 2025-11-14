import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Discover = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Discover</Text>
      <Text style={styles.subtext}>Search and explore</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Discover;

