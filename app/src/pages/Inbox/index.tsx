import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Inbox = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox</Text>
      </View>

      {/* Two Circles */}
      <View style={styles.circlesContainer}>
        {/* New Followers Circle */}
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => (navigation as any).navigate('NewFollowers')}
          activeOpacity={0.8}
        >
          <View style={[styles.circle, styles.newFollowersCircle]}>
            <Ionicons name="people" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.circleTitle}>New followers</Text>
            <Text style={styles.circleDescription}>See your new followers here.</Text>
          </View>
        </TouchableOpacity>

        {/* Activity Circle */}
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => (navigation as any).navigate('Activity')}
          activeOpacity={0.8}
        >
          <View style={[styles.circle, styles.activityCircle]}>
            <Ionicons name="heart" size={24} color="#E91E63" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.circleTitle}>Activity</Text>
            <Text style={styles.circleDescription}>See notifications here.</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2333',
  },
  circlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  circleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
  },
  newFollowersCircle: {
    backgroundColor: '#fff', // White
    borderColor: '#4A90E2', // Light blue
  },
  activityCircle: {
    backgroundColor: '#fff', // White
    borderColor: '#E91E63', // Pinkish-red
  },
  textContainer: {
    flex: 1,
  },
  circleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1d2333',
    marginBottom: 4,
  },
  circleDescription: {
    fontSize: 13,
    color: '#4b5162',
  },
});

export default Inbox;





