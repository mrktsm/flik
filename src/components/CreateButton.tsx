import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreateButton = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="add" size={28} color="#000" style={{ fontWeight: 'bold' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});

export default CreateButton;

