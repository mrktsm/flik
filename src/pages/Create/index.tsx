import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Create = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create</Text>
      <Text style={styles.subtext}>Upload your interactive content</Text>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#ec376d',
    borderRadius: 25,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Create;

