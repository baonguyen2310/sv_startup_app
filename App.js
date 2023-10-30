import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasPermission) {
    return (
      <WebView
        style={styles.container}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{ uri: 'https://wholesale-shocking-scene.glitch.me/' }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
