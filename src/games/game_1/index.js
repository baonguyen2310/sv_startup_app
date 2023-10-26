import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'; 

export default function GameBody({ time = 30, requireScore = 100 }) {
    // 1 - Nếu có nhiều sound thì nên tạo và giải phóng mỗi lần vì giữ tốn RAM
    // 2 - Nếu có ít sound mà hay dùng nhiều thì tạo 1 lần vì tạo tốn thời gian và CPU
    const [sound, setSound] = useState() 

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require("./meo.wav"))
        setSound(sound)
        await sound.playAsync()
    }

    useEffect(() => {
        return sound 
        ? () => {
            sound.unloadAsync()
        }
        : undefined
    }, [sound])

    return (
        <View>
            <Text>GameBody 1: Từ vựng</Text>
            <Text>Time: {time}</Text>
            <Text>Require Score: {requireScore}</Text>
            <Text style={styles.text}>Con Mèo</Text>
            <Image 
                source={require("./meo.jpg")} 
                style={styles.image}
            />
            <TouchableOpacity onPress={playSound}>
                <AntDesign name="sound" size={40} color="black" />
            </TouchableOpacity>
            <Video
                //source={{ uri: '' }}
                source={require('./meo.mp4')}
                useNativeControls
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
            />
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