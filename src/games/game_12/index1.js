import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
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
            source={{ uri: level.levelContent.main.url }}
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