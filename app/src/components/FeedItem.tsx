import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InteractiveContent from "./InteractiveContent";
import CommentsModal from "./CommentsModal";

const { width, height } = Dimensions.get("window");

const LIKED_ITEMS_KEY = "@flik:liked_items";

interface FeedItemProps {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  backgroundColor?: string;
  html?: string;
  css?: string;
  js?: string;
  fullHtml?: string;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onWebViewTouchStart?: () => void;
  onWebViewTouchEnd?: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({
  id,
  username,
  description,
  likes,
  comments,
  shares,
  backgroundColor = "#000",
  html,
  css,
  js,
  fullHtml,
  onFullscreenChange,
  onWebViewTouchStart,
  onWebViewTouchEnd,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const insets = useSafeAreaInsets();

  // Animation ref for like button icon
  const iconScale = useRef(new Animated.Value(1)).current;

  // Load liked status on mount
  useEffect(() => {
    loadLikedStatus();
  }, [id]);

  const loadLikedStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem(LIKED_ITEMS_KEY);
      if (stored) {
        const likedItems: number[] = JSON.parse(stored);
        setIsLiked(likedItems.includes(id));
      }
    } catch (error) {
      console.error("Error loading liked status:", error);
    }
  };

  const triggerLikeAnimation = () => {
    // Quick scale animation on the icon itself
    Animated.sequence([
      Animated.spring(iconScale, {
        toValue: 1.3,
        tension: 300,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 300,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLike = async () => {
    try {
      const stored = await AsyncStorage.getItem(LIKED_ITEMS_KEY);
      let likedItems: number[] = stored ? JSON.parse(stored) : [];

      if (isLiked) {
        // Remove from liked items
        likedItems = likedItems.filter((itemId) => itemId !== id);
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // Add to liked items
        if (!likedItems.includes(id)) {
          likedItems.push(id);
        }
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        // Trigger animation when liking
        triggerLikeAnimation();
      }

      await AsyncStorage.setItem(LIKED_ITEMS_KEY, JSON.stringify(likedItems));
    } catch (error) {
      console.error("Error saving liked status:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Main content area - interactive content */}
      <View style={styles.contentArea}>
        <InteractiveContent
          html={html}
          css={css}
          js={js}
          fullHtml={fullHtml}
          backgroundColor={backgroundColor}
          onTouchStart={onWebViewTouchStart}
          onTouchEnd={onWebViewTouchEnd}
        />
      </View>

      {/* Webview blockers - prevent webview from capturing touches in these areas */}
      {/* Bottom area blocker with extended padding around description */}
      {!isFullscreen && <View style={styles.bottomWebViewBlocker} />}

      {/* Right side blocker with extended padding around buttons */}
      {!isFullscreen && <View style={styles.rightWebViewBlocker} />}

      {/* Bottom left user info - fully interactive */}
      <View
        style={[styles.bottomSection, isFullscreen && styles.hiddenButton]}
        pointerEvents={isFullscreen ? "none" : "box-none"}
      >
        <View style={styles.userInfo} pointerEvents="box-none">
          <View style={styles.usernameRow}>
            <Image
              source={{
                uri:
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(username) +
                  "&background=random&color=fff&size=128&bold=true",
              }}
              style={styles.userAvatar}
            />
            <Text style={styles.username}>@{username}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Right side action buttons - fully clickable */}
      <View style={styles.rightActions} pointerEvents="box-none">
        {/* Like button */}
        <View
          style={styles.actionButtonWrapper}
          pointerEvents={isFullscreen ? "none" : "auto"}
        >
          <TouchableOpacity
            style={[styles.actionButton, isFullscreen && styles.hiddenButton]}
            onPress={handleLike}
            disabled={isFullscreen}
          >
            <Animated.View
              style={[
                styles.iconShadow,
                {
                  transform: [{ scale: iconScale }],
                },
              ]}
            >
              {isLiked ? (
                <Octicons name="heart-fill" size={26} color="#FF3040" />
              ) : (
                <Octicons name="heart" size={26} color="#fff" />
              )}
            </Animated.View>
            <Text style={styles.actionText}>{formatCount(likeCount)}</Text>
          </TouchableOpacity>
        </View>

        {/* Comment button */}
        <View
          style={styles.actionButtonWrapper}
          pointerEvents={isFullscreen ? "none" : "auto"}
        >
          <TouchableOpacity
            style={[styles.actionButton, isFullscreen && styles.hiddenButton]}
            onPress={() => setCommentsVisible(true)}
            disabled={isFullscreen}
          >
            <View style={styles.iconShadow}>
              <FontAwesome6 name="comments" size={26} color="#fff" />
            </View>
            <Text style={styles.actionText}>{formatCount(comments)}</Text>
          </TouchableOpacity>
        </View>

        {/* Share button */}
        <View
          style={styles.actionButtonWrapper}
          pointerEvents={isFullscreen ? "none" : "auto"}
        >
          <TouchableOpacity
            style={[styles.actionButton, isFullscreen && styles.hiddenButton]}
            disabled={isFullscreen}
          >
            <View style={styles.iconShadow}>
              <FontAwesome5 name="paper-plane" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>{formatCount(shares)}</Text>
          </TouchableOpacity>
        </View>

        {/* Fullscreen/Minimize button */}
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              const newFullscreenState = !isFullscreen;
              setIsFullscreen(newFullscreenState);
              onFullscreenChange?.(newFullscreenState);
            }}
          >
            <View style={styles.iconShadow}>
              {isFullscreen ? (
                <Octicons name="screen-normal" size={28} color="#fff" />
              ) : (
                <Octicons name="screen-full" size={28} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* More options button */}
        <View
          style={styles.actionButtonWrapper}
          pointerEvents={isFullscreen ? "none" : "auto"}
        >
          <TouchableOpacity
            style={[styles.actionButton, isFullscreen && styles.hiddenButton]}
            disabled={isFullscreen}
          >
            <View style={styles.iconShadow}>
              <Feather name="more-horizontal" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Modal */}
      <CommentsModal
        visible={commentsVisible}
        onClose={() => setCommentsVisible(false)}
        commentCount={comments}
        onAddComment={(text) => {
          // Handle adding comment if needed
          console.log("New comment:", text);
        }}
      />
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
  bottomWebViewBlocker: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 80, // Leave space, don't cover buttons
    height: 200, // Large area covering description and extra space above
    backgroundColor: "transparent",
    zIndex: 1, // Sits above webview
  },
  rightWebViewBlocker: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80, // Wide area covering buttons with padding
    backgroundColor: "transparent",
    zIndex: 1, // Sits above webview
  },
  bottomSection: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 90,
    zIndex: 2, // Above blockers so text is selectable
  },
  userInfo: {
    paddingHorizontal: 10,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1.5,
  },
  description: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1.5,
  },
  rightActions: {
    position: "absolute",
    right: 10,
    top: "58%",
    transform: [{ translateY: -50 }],
    alignItems: "center",
    zIndex: 2, // Above blockers so buttons are clickable
  },
  actionButtonWrapper: {
    marginBottom: 26,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2, // For Android
  },
  iconShadow: {
    // Subtle shadow for icons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1.5,
  },
  hiddenButton: {
    opacity: 0,
  },
});

export default FeedItem;
