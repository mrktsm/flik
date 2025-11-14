import React, { useRef } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';

interface InteractiveContentProps {
  html?: string;
  css?: string;
  js?: string;
  backgroundColor?: string;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

const InteractiveContent: React.FC<InteractiveContentProps> = ({
  html = '<div></div>',
  css = '',
  js = '',
  backgroundColor = '#000',
  onTouchStart,
  onTouchEnd,
}) => {
  // Combine HTML, CSS, and JS into a single HTML document
  const htmlContent = `
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

  console.log('WebView rendering with:', {
    hasHTML: !!html,
    hasCSS: !!css,
    hasJS: !!js,
    backgroundColor,
    htmlLength: html?.length || 0
  });

  return (
    <View 
      style={styles.container}
      onStartShouldSetResponder={() => {
        onTouchStart?.();
        return true;
      }}
      onResponderRelease={() => {
        onTouchEnd?.();
      }}
      onResponderTerminationRequest={() => false}
    >
      <WebView
        source={{ 
          html: htmlContent,
          baseUrl: 'about:blank'
        }}
        style={[styles.webview, { backgroundColor }]}
        scrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        nestedScrollEnabled={true}
        onLoadStart={() => console.log('WebView loading started')}
        onLoadEnd={() => console.log('WebView loading ended')}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
        }}
        onMessage={(event) => {
          console.log('WebView message:', event.nativeEvent.data);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView HTTP error:', nativeEvent);
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
    backgroundColor: 'transparent',
    opacity: 1,
  },
});

export default InteractiveContent;

