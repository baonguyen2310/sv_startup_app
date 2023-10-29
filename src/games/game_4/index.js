import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'; 
import { useRef } from 'react'; 
//import { GameEngine } from 'react-native-game-engine';
//import ThreeJSExample from "./ThreeJSExample";
import { WebView } from 'react-native-webview';

const Box = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                width: 50, 
                height: 50,
                backgroundColor: "blue" 
            }}
        />
    )
}

export default function GameBody({ time = 30, requireScore = 100 }) {
    const gameEngine = useRef(null);
    const entities = {
        // Khởi tạo entities tại đây
    }


    return (
        <View>
            <Text>GameBody 1: Từ vựng</Text>
            <Text>Time: {time}</Text>
            <Text>Require Score: {requireScore}</Text>
            <Text style={styles.text}>Con Mèo</Text>
            
            
            <WebView
                source={{ uri: 'https://expo.dev' }}
            />
        </View>
            //<ThreeJSExample />
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "bold"
    },
    image: {
        width: 200,
        height: 200
    },
    video: {
        width: 300,
        height: 300
    }
})