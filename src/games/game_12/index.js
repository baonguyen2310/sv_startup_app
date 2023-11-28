import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser';
//import { Camera } from 'expo-camera';

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    const handlePress = async () => {
        const options = {
            toolbarColor: '#ffcc8e',
            browserPackage: 'com.android.chrome',
            dismissButtonStyle: 'cancel',
            preferredControlColor: '#ffffff',
            showTitle: false,
            EnableDefaultShareMenuItem: false,
            presentationStyle: 'fullscreen',
        };

        await WebBrowser.openBrowserAsync(level.levelContent.main.url, options);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bé tìm {level.title}</Text>
            <Text style={styles.secondary}>Trò chơi này chỉ có trên nền web</Text>
            <Text style={styles.secondary}>Để có trải nghiệm tốt nhất, chúng tôi khuyến khích bạn sử dụng laptop để chơi cùng bé</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3498db' }]}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Mở trên nền web</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginVertical: 20,
        padding: 10,
        color: '#FF3FA4',
        borderWidth: 2,
        borderColor: 'pink'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#F875AA'
    },
    secondary: {
        color: "#0dcaf0",
        margin: 10,
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center'
    },
    button: {
        marginVertical: 10,
        padding: 10,
        width: "100%",
        backgroundColor: '#2ecc71',
        borderRadius: 5,
        alignItems: 'center', // Canh giữa nội dung bên trong TouchableOpacity
    },
        buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});