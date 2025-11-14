import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import PagerView from "react-native-pager-view";
import FeedItem from "../../components/FeedItem";
import { fliks } from "../../../fliks";

const { height } = Dimensions.get("window");

const Home = () => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    console.log("Fliks loaded:", fliks);
    console.log("Number of fliks:", fliks.length);
  }, []);

  const handleWebViewTouchStart = () => {
    console.log('WebView touched - disabling scroll');
    setScrollEnabled(false);
  };

  const handleWebViewTouchEnd = () => {
    console.log('WebView released - enabling scroll');
    setScrollEnabled(true);
  };

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
        scrollEnabled={scrollEnabled}
      >
        {fliks.map((item) => (
          <View key={item.id} style={styles.page}>
            <FeedItem
              username={item.username}
              description={item.description}
              likes={item.likes}
              comments={item.comments}
              shares={item.shares}
              backgroundColor={item.backgroundColor}
              html={item.html}
              css={item.css}
              js={item.js}
              onWebViewTouchStart={handleWebViewTouchStart}
              onWebViewTouchEnd={handleWebViewTouchEnd}
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
