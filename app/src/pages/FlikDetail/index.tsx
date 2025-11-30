import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, Feather, Octicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { fliks } from "../../../fliks";
import FeedItem from "../../components/FeedItem";
import PagerView from "react-native-pager-view";

const { width, height } = Dimensions.get("window");

type FlikDetailRouteParams = {
  flikId: number;
  initialIndex?: number;
  fromTab?: string;
};

type FlikDetailRouteProp = RouteProp<
  { params: FlikDetailRouteParams },
  "params"
>;

const FlikDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<FlikDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default to Discover if not specified
  const activeTab = route.params?.fromTab || "Discover";

  // Get all fliks
  const allFliks = fliks;

  // Find the initial index based on flikId or use provided initialIndex
  const getInitialIndex = () => {
    if (route.params?.flikId) {
      const index = allFliks.findIndex((f) => f.id === route.params.flikId);
      if (index >= 0) return index;
    }
    return route.params?.initialIndex ?? 0;
  };

  const initialIndex = getInitialIndex();

  // Scroll to initial index on mount
  useEffect(() => {
    if (pagerRef.current && initialIndex > 0) {
      setTimeout(() => {
        pagerRef.current?.setPage(initialIndex);
      }, 100);
    }
  }, [initialIndex]);

  const handleWebViewTouchStart = () => {
    setScrollEnabled(false);
  };

  const handleWebViewTouchEnd = () => {
    setScrollEnabled(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTabPress = (routeName: string) => {
    // If pressing the active tab, go back to the list
    if (routeName === activeTab) {
      handleBack();
      return;
    }

    // Get the root navigator and navigate directly to the tab
    // This avoids going back first and prevents animation issues
    const rootNavigation = navigation.getParent()?.getParent();
    if (rootNavigation) {
      (rootNavigation as any).navigate("Main", {
        screen: routeName,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={[
          styles.backButton,
          { top: insets.top + 10 },
          isFullscreen && styles.hiddenButton,
        ]}
        onPress={handleBack}
        activeOpacity={0.7}
        disabled={isFullscreen}
      >
        <View style={styles.iconShadow}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Scrollable Fliks using PagerView like Home */}
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={initialIndex}
        orientation="vertical"
        pageMargin={0}
        overdrag={false}
        scrollEnabled={scrollEnabled && !isFullscreen}
      >
        {allFliks.map((flik) => (
          <View key={flik.id} style={styles.page}>
            <FeedItem
              id={flik.id}
              username={flik.username}
              description={flik.description}
              likes={flik.likes}
              comments={flik.comments}
              shares={flik.shares}
              backgroundColor={flik.backgroundColor}
              html={flik.html}
              css={flik.css}
              js={flik.js}
              fullHtml={flik.fullHtml}
              onWebViewTouchStart={handleWebViewTouchStart}
              onWebViewTouchEnd={handleWebViewTouchEnd}
              onFullscreenChange={setIsFullscreen}
            />
          </View>
        ))}
      </PagerView>

      {/* Transparent Tab Bar Overlay */}
      <View
        style={[
          styles.tabBar,
          {
            bottom: Math.max(insets.bottom, 20),
          },
          isFullscreen && styles.hiddenButton,
        ]}
        pointerEvents={isFullscreen ? "none" : "box-none"}
      >
        <View style={styles.tabBarContent} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress("Home")}
          >
            <View style={styles.iconShadow}>
              <Octicons
                name="home"
                size={28}
                color={activeTab === "Home" ? "#fff" : "#888"}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress("Discover")}
          >
            <View style={styles.iconShadow}>
              <Ionicons
                name="search"
                size={28}
                color={activeTab === "Discover" ? "#fff" : "#888"}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress("Inbox")}
          >
            <View style={styles.iconShadow}>
              <Feather
                name="inbox"
                size={28}
                color={activeTab === "Inbox" ? "#fff" : "#888"}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress("Profile")}
          >
            <View style={styles.iconShadow}>
              <Octicons
                name="person"
                size={28}
                color={activeTab === "Profile" ? "#fff" : "#888"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 100,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    width: "100%",
    height: height,
  },
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 50,
  },
  tabBarContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 10,
    minHeight: 60,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  hiddenButton: {
    opacity: 0,
  },
});

export default FlikDetail;
