import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { fliks, Flik } from "../../../fliks";
import { previewImages } from "../../../assets/previews";

const { width } = Dimensions.get("window");
const TILES_PER_ROW = 2;
const BORDER_WIDTH = 4;
// Calculate tile width: (screen width - border between tiles) / 2
const TILE_WIDTH = (width - BORDER_WIDTH) / TILES_PER_ROW;
const TILE_HEIGHT = TILE_WIDTH * 1.5; // Rectangular tiles (phone aspect ratio)

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Shuffle fliks once when component mounts
  const shuffledFliks = useMemo(() => shuffleArray(fliks), []);

  const filteredFliks = useMemo(() => {
    if (!searchQuery.trim()) {
      return shuffledFliks;
    }
    const query = searchQuery.toLowerCase();
    return shuffledFliks.filter(
      (flik) =>
        flik.username.toLowerCase().includes(query) ||
        flik.description.toLowerCase().includes(query)
    );
  }, [searchQuery, shuffledFliks]);

  const handleFlikPress = (flik: Flik, index: number) => {
    // Find the index in the original shuffled array
    const originalIndex = shuffledFliks.findIndex((f) => f.id === flik.id);
    (navigation as any).navigate("FlikDetail", {
      flikId: flik.id,
      initialIndex: originalIndex >= 0 ? originalIndex : index,
    });
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Fliks Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        scrollEnabled={true}
      >
        {filteredFliks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>No fliks found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        ) : (
          filteredFliks.map((flik, index) => {
            const isLeftTile = index % TILES_PER_ROW === 0;
            const isRightTile = index % TILES_PER_ROW === TILES_PER_ROW - 1;
            const isLastRow = index >= filteredFliks.length - TILES_PER_ROW;
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
                {/* Game preview */}
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
                  <View style={styles.statsOverlay}>
                    <View style={styles.statItem}>
                      <Octicons name="heart" size={12} color="#fff" />
                      <Text style={styles.statText}>
                        {formatCount(flik.likes)}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons
                        name="chatbubble-outline"
                        size={12}
                        color="#fff"
                      />
                      <Text style={styles.statText}>
                        {formatCount(flik.comments)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 22, // Half of height (44) to make it circular
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#1d2333",
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 0,
    paddingBottom: 80, // Space for navbar
    maxWidth: "100%",
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
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  statText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 60,
    paddingTop: 100,
    width: "100%",
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
});

export default Discover;
