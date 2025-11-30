import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  PanResponder,
  Keyboard,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

interface Comment {
  id: string;
  username: string;
  text: string;
  likes: number;
  timeAgo: string;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  commentCount: number;
  comments?: Comment[];
  onAddComment?: (text: string) => void;
}

const defaultComments: Comment[] = [
  {
    id: "1",
    username: "user123",
    text: "This is amazing! 🔥",
    likes: 124,
    timeAgo: "2h",
    isLiked: false,
  },
  {
    id: "2",
    username: "cooluser",
    text: "Love this content! Keep it up 👏",
    likes: 89,
    timeAgo: "5h",
    isLiked: true,
  },
  {
    id: "3",
    username: "fan_account",
    text: "Can't stop watching this 😍",
    likes: 156,
    timeAgo: "1d",
    isLiked: false,
  },
  {
    id: "4",
    username: "creativemind",
    text: "The creativity here is insane!",
    likes: 203,
    timeAgo: "2d",
    isLiked: false,
  },
  {
    id: "5",
    username: "techlover",
    text: "How did you make this? So cool!",
    likes: 67,
    timeAgo: "3d",
    isLiked: false,
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.75;
const TRANSLATE_Y_DISTANCE = MODAL_HEIGHT + 50; // Modal height + extra padding

const CommentsModal: React.FC<CommentsModalProps> = ({
  visible,
  onClose,
  commentCount,
  comments = defaultComments,
  onAddComment,
}) => {
  const [inputText, setInputText] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const backdropAnim = React.useRef(new Animated.Value(0)).current;
  const panY = React.useRef(new Animated.Value(0)).current;
  const lastPanY = React.useRef(0);
  const textInputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (visible) {
      // Ensure modal starts off-screen before showing
      slideAnim.setValue(0);
      backdropAnim.setValue(0);
      panY.setValue(0);
      lastPanY.current = 0;
      setReplyingTo(null);
      setInputText("");
      setIsVisible(true);
      // Use requestAnimationFrame to ensure modal is positioned before animating
      requestAnimationFrame(() => {
        // Backdrop appears immediately
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
        // Modal slides up with spring animation
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }).start();
      });
    } else if (isVisible) {
      // Animate down before closing when visible prop becomes false
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Small delay to ensure animation is fully complete
        setTimeout(() => {
          setIsVisible(false);
        }, 50);
      });
    }
  }, [visible]);

  // Handle keyboard show/hide events
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // Pan responder for swipe to close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical downward swipes
        return (
          gestureState.dy > 0 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 5
        );
      },
      onPanResponderGrant: () => {
        panY.setOffset(lastPanY.current);
        panY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward swipes
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        const finalDy = gestureState.dy + lastPanY.current;
        lastPanY.current = finalDy;

        // If swiped down more than 100px or with enough velocity, close the modal
        if (finalDy > 100 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          // Spring back to original position
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start(() => {
            lastPanY.current = 0;
          });
        }
      },
    })
  ).current;

  const handleClose = () => {
    // Reset pan values
    panY.setValue(0);
    lastPanY.current = 0;

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Small delay to ensure animation is fully complete
      setTimeout(() => {
        setIsVisible(false);
        setReplyingTo(null);
        setInputText("");
        onClose();
      }, 50);
    });
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        username: "you",
        text: inputText.trim(),
        likes: 0,
        timeAgo: "now",
        isLiked: false,
      };

      if (replyingTo) {
        // Add as reply to the parent comment
        setCommentList(
          commentList.map((comment) => {
            if (comment.id === replyingTo) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }
            return comment;
          })
        );
        setReplyingTo(null);
      } else {
        // Add as new top-level comment
        setCommentList([newComment, ...commentList]);
        onAddComment?.(inputText.trim());
      }
      setInputText("");
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    // Focus the input after a short delay to ensure state is updated
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  };

  const toggleLike = (
    id: string,
    isReply: boolean = false,
    parentId?: string
  ) => {
    if (isReply && parentId) {
      // Toggle like on a reply
      setCommentList(
        commentList.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: (comment.replies || []).map((reply) =>
                reply.id === id
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            };
          }
          return comment;
        })
      );
    } else {
      // Toggle like on a top-level comment
      setCommentList(
        commentList.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment
        )
      );
    }
  };

  const baseTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [TRANSLATE_Y_DISTANCE, 0],
  });

  // Combine base animation with pan gesture (don't include modalBottomAnim here)
  const translateY = Animated.add(baseTranslateY, panY);

  // Backdrop fades in/out independently
  const backdropOpacity = backdropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7],
  });

  const renderReply = (reply: Comment, parentId: string) => (
    <View key={reply.id} style={styles.replyItem}>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            reply.username
          )}&background=random&color=000&size=128&bold=true`,
        }}
        style={styles.replyAvatar}
      />
      <View style={styles.replyContent}>
        <View style={styles.replyHeader}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.replyUsername}>@{reply.username}</Text>
          </TouchableOpacity>
          <Text style={styles.replyTime}>{reply.timeAgo}</Text>
        </View>
        <Text style={styles.replyText}>{reply.text}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleReply(parentId)}
        >
          <Text style={styles.replyActionText}>Reply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.replyLikes}>
        <TouchableOpacity
          style={styles.replyLikeButton}
          onPress={() => toggleLike(reply.id, true, parentId)}
          activeOpacity={0.7}
        >
          {reply.isLiked ? (
            <Octicons name="heart-fill" size={16} color="#FF3040" />
          ) : (
            <Octicons name="heart" size={16} color="rgba(0, 0, 0, 0.4)" />
          )}
          {reply.likes > 0 && (
            <Text style={styles.replyLikeCount}>{reply.likes}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentWrapper}>
      <View style={styles.commentItem}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              item.username
            )}&background=random&color=000&size=128&bold=true`,
          }}
          style={styles.commentAvatar}
        />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.commentUsername}>@{item.username}</Text>
            </TouchableOpacity>
            <Text style={styles.commentTime}>{item.timeAgo}</Text>
          </View>
          <Text style={styles.commentText}>{item.text}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.commentReplyButton}
            onPress={() => handleReply(item.id)}
          >
            <Text style={styles.commentReply}>Reply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentLikes}>
          <TouchableOpacity
            style={styles.commentLikeButton}
            onPress={() => toggleLike(item.id)}
            activeOpacity={0.7}
          >
            {item.isLiked ? (
              <Octicons name="heart-fill" size={18} color="#FF3040" />
            ) : (
              <Octicons name="heart" size={18} color="rgba(0, 0, 0, 0.5)" />
            )}
            {item.likes > 0 && (
              <Text style={styles.commentLikeCount}>{item.likes}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Render replies outside the main comment row */}
      {item.replies && item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.replies.map((reply) => renderReply(reply, item.id))}
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Header - Swipeable */}
          <Animated.View style={styles.header} {...panResponder.panHandlers}>
            <View style={styles.headerHandle} />
            <Text style={styles.headerTitle}>Comments</Text>
          </Animated.View>

          <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={SCREEN_HEIGHT - MODAL_HEIGHT}
          >
            {/* Comments List */}
            <View style={styles.commentsContainer}>
              <FlatList
                data={commentList}
                renderItem={renderComment}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.commentsList}
                showsVerticalScrollIndicator={false}
                inverted={false}
                bounces={true}
                overScrollMode="always"
                keyboardShouldPersistTaps="handled"
              />
            </View>

            {/* Input Area */}
            {replyingTo && (
              <View style={styles.replyingToContainer}>
                <Text style={styles.replyingToText}>
                  Replying to @
                  {commentList.find((c) => c.id === replyingTo)?.username || ""}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setReplyingTo(null);
                    setInputText("");
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelReplyText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={[
                styles.inputContainer,
                {
                  paddingBottom: isKeyboardVisible ? 12 : 35,
                },
              ]}
            >
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=you&background=random&color=000&size=128&bold=true`,
                }}
                style={styles.inputAvatar}
              />
              <TextInput
                ref={textInputRef}
                style={styles.input}
                placeholder={
                  replyingTo
                    ? `Reply to @${
                        commentList.find((c) => c.id === replyingTo)
                          ?.username || ""
                      }...`
                    : "Add a comment..."
                }
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={200}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
              {inputText.trim().length > 0 && (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "column",
    height: MODAL_HEIGHT,
    overflow: "hidden",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  commentsContainer: {
    flex: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    position: "relative",
    minHeight: 50,
  },
  headerHandle: {
    position: "absolute",
    top: 8,
    width: 36,
    height: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 2,
    alignSelf: "center",
  },
  headerTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  commentsList: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  commentWrapper: {
    marginBottom: 12,
  },
  commentItem: {
    flexDirection: "row",
  },
  commentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  commentContent: {
    flex: 1,
    marginRight: 8,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentUsername: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  commentTime: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 12,
    marginLeft: 4,
  },
  commentText: {
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 4,
  },
  commentReplyButton: {
    marginTop: 0,
  },
  commentReply: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 12,
    fontWeight: "600",
  },
  commentLikes: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingRight: 0,
    marginRight: 0,
    paddingLeft: 0,
  },
  commentLikeButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    minHeight: 44,
    padding: 0,
    margin: 0,
  },
  commentLikeCount: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 11,
    marginTop: 2,
    textAlign: "center",
  },
  repliesContainer: {
    marginTop: 12,
    marginLeft: 56, // Avatar width (44) + marginRight (12) = 56
  },
  replyItem: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "flex-start",
  },
  replyAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  replyContent: {
    flex: 1,
    marginRight: 8,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  replyUsername: {
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
  },
  replyTime: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 11,
    marginLeft: 4,
  },
  replyText: {
    color: "#000",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  replyActionText: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 11,
    fontWeight: "600",
  },
  replyLikes: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 12,
    paddingRight: 0,
    marginRight: 0,
    paddingLeft: 0,
  },
  replyLikeButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
  },
  replyLikeCount: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
  replyingToContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    minHeight: 40,
  },
  replyingToText: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlignVertical: "center",
  },
  cancelReplyText: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    textAlignVertical: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  inputAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#000",
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  sendButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CommentsModal;
