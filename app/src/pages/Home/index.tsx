import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";
import FeedItem from "../../components/FeedItem";
import { fliks } from "../../../fliks";
import { useFullscreen } from "../../contexts/FullscreenContext";

const { height } = Dimensions.get("window");

// End of feed component
const EndOfFeedScreen = () => {
  return (
    <View style={styles.endOfFeedContainer}>
      <Ionicons name="infinite-outline" size={64} color="#fff" />
      <Text style={styles.endOfFeedTitle}>You've seen all the fliks</Text>
      <Text style={styles.endOfFeedSubtext}>
        The next ones you see will repeat
      </Text>
    </View>
  );
};

const Home = () => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { isFullscreen, setIsFullscreen } = useFullscreen();

  // Create pages array: all fliks + end screen + looping fliks
  const pages = useMemo(() => {
    const pagesArray: Array<{ type: 'flik' | 'end'; flik?: typeof fliks[0]; index?: number }> = [];
    
    // Add all unique fliks
    fliks.forEach((flik) => {
      pagesArray.push({ type: 'flik', flik });
    });
    
    // Add end of feed screen
    pagesArray.push({ type: 'end' });
    
    // Add looping fliks (repeat the original fliks)
    fliks.forEach((flik, index) => {
      pagesArray.push({ type: 'flik', flik, index });
    });
    
    return pagesArray;
  }, []);

  useEffect(() => {
    console.log("Fliks loaded:", fliks);
    console.log("Number of fliks:", fliks.length);
    console.log("Total pages:", pages.length);
  }, [pages.length]);

  if (!fliks || fliks.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white', fontSize: 20 }}>No fliks found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        orientation="vertical"
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        pageMargin={0}
        overdrag={false}
        scrollEnabled={!isFullscreen}
      >
        {pages.map((page, index) => {
          if (page.type === 'end') {
            return (
              <View key={`end-${index}`} style={styles.page}>
                <EndOfFeedScreen />
              </View>
            );
          } else if (page.flik) {
            return (
              <View key={`${page.flik.id}-${index}`} style={styles.page}>
                <FeedItem
                  id={page.flik.id}
                  username={page.flik.username}
                  description={page.flik.description}
                  likes={page.flik.likes}
                  comments={page.flik.comments}
                  shares={page.flik.shares}
                  backgroundColor={page.flik.backgroundColor}
                  html={page.flik.html}
                  css={page.flik.css}
                  js={page.flik.js}
                  fullHtml={page.flik.fullHtml}
                  onFullscreenChange={setIsFullscreen}
                />
              </View>
            );
          }
          return null;
        })}
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
  endOfFeedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 40,
  },
  endOfFeedTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 24,
    textAlign: "center",
  },
  endOfFeedSubtext: {
    color: "#888",
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
  },
});

export default Home;
