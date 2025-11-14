import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import FeedItem from "../../components/FeedItem";

const { height } = Dimensions.get("window");

// Mock data for the feed
const feedData = [
  {
    id: 1,
    username: "codewizard",
    description:
      "Check out this cool interactive particle effect! ✨ #interactive #javascript",
    likes: 125000,
    comments: 3420,
    shares: 8900,
    backgroundColor: "#1a1a2e",
  },
  {
    id: 2,
    username: "creativecoder",
    description: "Made a playable mini-game in the browser 🎮 Swipe to try it!",
    likes: 89000,
    comments: 2100,
    shares: 4500,
    backgroundColor: "#2d1b3d",
  },
  {
    id: 3,
    username: "webartist",
    description: "3D animation using Three.js 🌟 What do you think?",
    likes: 210000,
    comments: 5600,
    shares: 12000,
    backgroundColor: "#1e3a2e",
  },
  {
    id: 4,
    username: "interactivedev",
    description: "Interactive data visualization 📊 Built with D3.js",
    likes: 67000,
    comments: 1800,
    shares: 3200,
    backgroundColor: "#2e1e1a",
  },
  {
    id: 5,
    username: "motiondesigner",
    description: "Smooth CSS animations 💫 No JavaScript needed!",
    likes: 145000,
    comments: 4200,
    shares: 7800,
    backgroundColor: "#1a2e3a",
  },
];

const Home = () => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        orientation="vertical"
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {feedData.map((item) => (
          <View key={item.id} style={styles.page}>
            <FeedItem
              username={item.username}
              description={item.description}
              likes={item.likes}
              comments={item.comments}
              shares={item.shares}
              backgroundColor={item.backgroundColor}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    width: "100%",
    height: height,
  },
});

export default Home;
