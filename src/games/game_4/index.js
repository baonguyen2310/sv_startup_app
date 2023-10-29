import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'; 

export default function GameBody({ time = 30, requireScore = 100 }) {

    return (
        <View>
            <Text>GameBody 1: Từ vựng</Text>
            <Text>Time: {time}</Text>
            <Text>Require Score: {requireScore}</Text>
            <Text style={styles.text}>Con Mèo</Text>
            
        </View>
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