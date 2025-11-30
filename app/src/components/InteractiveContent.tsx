import React, { useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { WebView } from "react-native-webview";

interface InteractiveContentProps {
  html?: string;
  css?: string;
  js?: string;
  fullHtml?: string; // For complete HTML documents
  backgroundColor?: string;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

const InteractiveContent: React.FC<InteractiveContentProps> = ({
  html = "<div></div>",
  css = "",
  js = "",
  fullHtml,
  backgroundColor = "#000",
  onTouchStart,
  onTouchEnd,
}) => {
  const injectLockingCode = (content: string) => {
    const lockingStyle = `
      <style>
        * {
          touch-action: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        html, body {
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
        }
      </style>
    `;

    const lockingScript = `
      <script>
        document.addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, { passive: false, capture: true });
      </script>
    `;

    // Ensure content is a string
    let newContent = typeof content === 'string' ? content : String(content || '');
    
    // Inject Style
    if (newContent.includes('</head>')) {
      newContent = newContent.replace('</head>', lockingStyle + '</head>');
    } else {
      newContent = lockingStyle + newContent;
    }

    // Inject Script
    if (newContent.includes('</body>')) {
      newContent = newContent.replace('</body>', lockingScript + '</body>');
    } else {
      newContent = newContent + lockingScript;
    }

    return newContent;
  };

  // Use fullHtml if provided, otherwise combine HTML, CSS, and JS
  let htmlContent: string =
    (typeof fullHtml === 'string' ? fullHtml : '') ||
    `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (e) {
      console.error('JavaScript error:', e);
      document.body.innerHTML = '<div style="color: white; padding: 20px;">Error: ' + e.message + '</div>';
    }
  </script>
</body>
</html>
  `;

  // Apply locking to ALL content, including fullHtml
  htmlContent = injectLockingCode(htmlContent);

  console.log("WebView rendering with:", {
    hasHTML: !!html,
    hasCSS: !!css,
    hasJS: !!js,
    hasFullHtml: !!fullHtml,
    backgroundColor,
    htmlLength: html?.length || 0,
    fullHtmlLength: fullHtml?.length || 0,
  });

  return (
    <View style={styles.container}>
      <WebView
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        source={{
          html: htmlContent,
          baseUrl: "https://cdn.jsdelivr.net",
        }}
        style={[styles.webview, { backgroundColor }]}
        scrollEnabled={true} // Must be true to intercept touches from PagerView
        overScrollMode="never" // Android: disable overscroll effect
        bounces={false} // iOS: disable bounce effect
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={["*"]}
        nestedScrollEnabled={true}
        mixedContentMode="always"
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        onLoadStart={() => console.log("WebView loading started")}
        onLoadEnd={() => console.log("WebView loading ended")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error:", nativeEvent);
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log(`[WebView ${data.type}]:`, data.message);
          } catch {
            console.log("WebView message:", event.nativeEvent.data);
          }
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView HTTP error:", nativeEvent);
        }}
        onShouldStartLoadWithRequest={(request) => {
          console.log("WebView loading request:", request.url);
          return true;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
    opacity: 1,
  },
});

export default InteractiveContent;
