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
import InteractiveContent from "./InteractiveContent";

const { width, height } = Dimensions.get("window");

interface FeedItemProps {
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  backgroundColor?: string;
  html?: string;
  css?: string;
  js?: string;
  onWebViewTouchStart?: () => void;
  onWebViewTouchEnd?: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({
  username,
  description,
  likes,
  comments,
  shares,
  backgroundColor = "#000",
  html,
  css,
  js,
  onWebViewTouchStart,
  onWebViewTouchEnd,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Bottom swipe zone - covers navbar area */}
      <View style={styles.bottomSwipeZone} pointerEvents="auto" />

      {/* Right side swipe zone - expanded hit area */}
      <View style={styles.rightSwipeZone} pointerEvents="auto" />

      {/* Main content area - interactive content */}
      <View style={styles.contentArea}>
        <InteractiveContent
          html={html}
          css={css}
          js={js}
          backgroundColor={backgroundColor}
          onTouchStart={onWebViewTouchStart}
          onTouchEnd={onWebViewTouchEnd}
        />
      </View>

      {/* Bottom left user info */}
      <View style={styles.bottomSection} pointerEvents="box-none">
        <View style={styles.userInfo} pointerEvents="auto">
          <View style={styles.usernameRow}>
            <FontAwesome name="user-circle" size={20} color="#fff" />
            <Text style={styles.username}>@{username}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Right side action buttons */}
      <View style={styles.rightActions} pointerEvents="box-none">
        {/* Like button */}
        <TouchableOpacity style={styles.actionButton} pointerEvents="auto">
          <Feather name="heart" size={29} color="#fff" />
          <Text style={styles.actionText}>{formatCount(likes)}</Text>
        </TouchableOpacity>

        {/* Comment button */}
        <TouchableOpacity style={styles.actionButton} pointerEvents="auto">
          <FontAwesome6 name="comments" size={26} color="#fff" />
          <Text style={styles.actionText}>{formatCount(comments)}</Text>
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.actionButton} pointerEvents="auto">
          <Octicons name="share" size={28} color="#fff" />
          <Text style={styles.actionText}>{formatCount(shares)}</Text>
        </TouchableOpacity>

        {/* More options button */}
        <TouchableOpacity style={styles.actionButton} pointerEvents="auto">
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
    width: "100%",
  },
  bottomSwipeZone: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "transparent",
  },
  rightSwipeZone: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "transparent",
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
    right: 90,
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
