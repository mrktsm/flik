import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fliks, Flik } from "../../../fliks";
import { previewImages } from "../../../assets/previews";

const { width } = Dimensions.get("window");
const TILES_PER_ROW = 2;
const BORDER_WIDTH = 4;
const TILE_WIDTH = (width - BORDER_WIDTH) / TILES_PER_ROW;
const TILE_HEIGHT = TILE_WIDTH * 1.5;

const LIKED_ITEMS_KEY = "@flik:liked_items";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'liked' | 'games'>('liked');
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Load liked items from storage on mount and when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadLikedItems();
    }, [])
  );

  const loadLikedItems = async () => {
    try {
      const stored = await AsyncStorage.getItem(LIKED_ITEMS_KEY);
      if (stored) {
        setLikedItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading liked items:", error);
    }
  };

  // Only show liked items
  const displayedFliks = useMemo(() => {
    return fliks.filter((flik) => likedItems.includes(flik.id));
  }, [likedItems]);

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  const handleFlikPress = (flik: Flik, index: number) => {
    // Find the index in the original fliks array
    const originalIndex = fliks.findIndex((f) => f.id === flik.id);
    
    // Navigate to FlikDetail in the Profile Stack
    (navigation as any).navigate("FlikDetail", {
      flikId: flik.id,
      initialIndex: originalIndex >= 0 ? originalIndex : index,
      fromTab: "Profile",
    });
  };

  // Calculate stats
  const totalLikes = likedItems.length;
  const totalFollowers = 12500; // Placeholder
  const totalFollowing = 890; // Placeholder

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          {/* Centered Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  "https://ui-avatars.com/api/?name=You&background=random&color=fff&size=128&bold=true",
              }}
              style={styles.avatar}
            />
          </View>

          {/* Username - Above stats */}
          <View style={styles.userDetails}>
            <Text style={styles.username}>@you</Text>
          </View>

          {/* Stats Row - Centered */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatCount(totalFollowing)}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatCount(totalFollowers)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatCount(totalLikes)}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
            onPress={() => setActiveTab('liked')}
          >
            <Octicons 
              name="heart" 
              size={20} 
              color={activeTab === 'liked' ? "#000" : "#888"} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'games' && styles.activeTab]}
            onPress={() => setActiveTab('games')}
          >
            <Ionicons 
              name="list" 
              size={24} 
              color={activeTab === 'games' ? "#000" : "#888"} 
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'liked' ? (
          // Grid of Fliks
          displayedFliks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No liked fliks yet
              </Text>
              <Text style={styles.emptySubtext}>
                Like fliks to see them here
              </Text>
            </View>
          ) : (
            <View style={styles.gridContainer}>
              {displayedFliks.map((flik, index) => {
                const isLeftTile = index % TILES_PER_ROW === 0;
                const isRightTile = index % TILES_PER_ROW === TILES_PER_ROW - 1;
                const isLastRow =
                  index >= displayedFliks.length - TILES_PER_ROW;
                return (
                  <TouchableOpacity
                    key={flik.id}
                    style={[
                      styles.tile,
                      isLeftTile && styles.tileLeftBorder,
                      !isRightTile && styles.tileRightBorder,
                      !isLastRow && styles.tileBottomBorder,
                    ]}
                    onPress={() => handleFlikPress(flik, index)}
                    activeOpacity={0.9}
                  >
                    <View
                      style={[
                        styles.tileVisual,
                        { backgroundColor: flik.backgroundColor },
                      ]}
                    >
                      {previewImages[flik.id] ? (
                        <Image
                          source={previewImages[flik.id]}
                          style={styles.tileImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          style={[
                            styles.tileVisual,
                            { backgroundColor: flik.backgroundColor },
                          ]}
                        />
                      )}
                      {/* Likes and Comments Overlay */}
                      <View style={styles.statsOverlay} pointerEvents="none">
                        <View style={styles.statItemOverlay}>
                          <Octicons name="heart" size={12} color="#fff" />
                          <Text style={styles.statTextOverlay}>
                            {formatCount(flik.likes)}
                          </Text>
                        </View>
                        <View style={styles.statItemOverlay}>
                          <Ionicons
                            name="chatbubble-outline"
                            size={12}
                            color="#fff"
                          />
                          <Text style={styles.statTextOverlay}>
                            {formatCount(flik.comments)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )
        ) : (
          // My Games Tab Content
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={[
                styles.tile,
                styles.tileLeftBorder,
                styles.tileRightBorder,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                },
              ]}
              onPress={() => {
                // Handle add game press
              }}
              activeOpacity={0.9}
            >
              <Octicons name="plus" size={40} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d2333",
  },
  statLabel: {
    fontSize: 13,
    color: "#4b5162",
    marginTop: 4,
  },
  userDetails: {
    marginBottom: 16,
    alignItems: "center",
    width: "100%",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d2333",
    marginBottom: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#1d2333",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 0,
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  tileRightBorder: {
    borderRightWidth: BORDER_WIDTH,
    borderRightColor: "#fff",
  },
  tileLeftBorder: {
    borderLeftWidth: BORDER_WIDTH,
    borderLeftColor: "#fff",
  },
  tileBottomBorder: {
    borderBottomWidth: BORDER_WIDTH,
    borderBottomColor: "#fff",
  },
  tileVisual: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "relative",
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
  statsOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    zIndex: 10,
  },
  statItemOverlay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  statTextOverlay: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingTop: 100,
    minHeight: 400,
  },
  emptyText: {
    color: "#1d2333",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    color: "#4b5162",
    fontSize: 15,
    marginTop: 8,
  },
  placeholderSquare: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});

export default Profile;
