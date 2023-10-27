import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useState, useEffect } from "react"
import Draggable from "react-native-draggable"
import { shuffleArray } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import { Audio, Video, ResizeMode } from "expo-av"

const story = [
    {
        id: 1,
        imageSrc: require("./1.jpg"),
        audioSrc: "./1.wav"
    },
    {
        id: 2,
        imageSrc: require("./2.jpg"),
        audioSrc: "./2.wav"
    },
    {
        id: 3,
        imageSrc: require("./3.jpg"),
        audioSrc: "./3.wav"
    },
    {
        id: 4,
        imageSrc: require("./4.jpg"),
        audioSrc: "./4.wav"
    },
    {
        id: 5,
        imageSrc: require("./5.jpg"),
        audioSrc: "./5.wav"
    }
]
const shuffledStory = shuffleArray(story)
// console.log(story)
// console.log(shuffledStory)

export default function GameBody({ time, requireScore }) {
    const [sound, setSound] = useState() 

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require("./full.wav"))
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
            <Text>GameBody 3: Kể chuyện</Text>
            <TouchableOpacity onPress={playSound}>
                <AntDesign name="sound" size={40} color="black" />
            </TouchableOpacity>
            {
                shuffledStory.map((item, index) => {
                    return (
                        <Draggable 
                            key={index}
                            x={75} 
                            y={100} 
                            renderSize={150} 
                            renderColor='pink' 
                            renderText={""}
                            isCircle={false}
                            shouldReverse={false}
                            onShortPressRelease={()=>alert('touched!!')}
                            onDragRelease={(event, gestureState) => {
                                const xCoordinate = gestureState.moveX;
                                const yCoordinate = gestureState.moveY;
                                console.log(`X: ${xCoordinate}, Y: ${yCoordinate}`);
                            }}
                        >
                            <Image source={item.imageSrc} />
                            <TouchableOpacity onPress={playSound}>
                                <AntDesign name="sound" size={40} color="black" />
                            </TouchableOpacity>
                        </Draggable>
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