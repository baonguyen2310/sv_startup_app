import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useState, useEffect } from "react"
import Draggable from "react-native-draggable"
import { shuffleArray } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import { Audio, Video, ResizeMode } from "expo-av"

const sentence = "Con đói! Con muốn ăn cơm"
const wordList = sentence.split(" ")
const shuffledWordList = shuffleArray(wordList)
console.log(wordList)
console.log(shuffledWordList)

export default function GameBody({ time, requireScore }) {
    const [sound, setSound] = useState() 

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require("./doi.wav"))
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
            <Text>GameBody 2: Sắp xếp từ trong câu</Text>
            <TouchableOpacity onPress={playSound}>
                <AntDesign name="sound" size={40} color="black" />
            </TouchableOpacity>
            <Image 
                source={require("./doi.jpg")} 
                style={styles.image}
            />
            {
                shuffledWordList.map((word, index) => {
                    return (
                        <Draggable 
                            key={index}
                            x={75} 
                            y={100} 
                            renderSize={56} 
                            renderColor='pink' 
                            renderText={word}
                            isCircle
                            shouldReverse={false}
                            onShortPressRelease={()=>alert('touched!!')}
                            onDragRelease={(event, gestureState) => {
                                const xCoordinate = gestureState.moveX;
                                const yCoordinate = gestureState.moveY;
                                console.log(`X: ${xCoordinate}, Y: ${yCoordinate}`);
                            }}
                        />
                    )
                })
            }
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