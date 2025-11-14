import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  Octicons,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface FeedItemProps {
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  backgroundColor?: string;
}

const FeedItem: React.FC<FeedItemProps> = ({
  username,
  description,
  likes,
  comments,
  shares,
  backgroundColor = "#000",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Main content area - placeholder for interactive content */}
      <View style={styles.contentArea}>
        <View style={styles.placeholderContent}>
          <Ionicons name="code-slash" size={60} color="rgba(255,255,255,0.3)" />
          <Text style={styles.placeholderText}>Interactive Content Here</Text>
        </View>
      </View>

      {/* Bottom left user info */}
      <View style={styles.bottomSection}>
        <View style={styles.userInfo}>
          <View style={styles.usernameRow}>
            <FontAwesome name="user-circle" size={20} color="#fff" />
            <Text style={styles.username}>@{username}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Right side action buttons */}
      <View style={styles.rightActions}>
        {/* Like button */}
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="heart" size={29} color="#fff" />
          <Text style={styles.actionText}>{formatCount(likes)}</Text>
        </TouchableOpacity>

        {/* Comment button */}
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="comments" size={26} color="#fff" />
          <Text style={styles.actionText}>{formatCount(comments)}</Text>
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.actionButton}>
          <Octicons name="share" size={28} color="#fff" />
          <Text style={styles.actionText}>{formatCount(shares)}</Text>
        </TouchableOpacity>

        {/* More options button */}
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="more-horizontal" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
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

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "#000",
    position: "relative",
  },
  contentArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 16,
    marginTop: 10,
  },
  bottomSection: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 80,
  },
  userInfo: {
    paddingHorizontal: 10,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  rightActions: {
    position: "absolute",
    right: 10,
    top: "65%",
    transform: [{ translateY: -75 }],
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 28,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },
});

export default FeedItem;
