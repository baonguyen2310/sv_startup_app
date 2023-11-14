import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions, Alert } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import AIAssistant from "../../components/AIAssitant"
import Voice from '@react-native-voice/voice'
import { checkSpeechAnswer } from "../../utils"
import Microphone from "../../components/Microphone"


export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    // 1 - Nếu có nhiều sound thì nên tạo và giải phóng mỗi lần vì giữ tốn RAM
    // 2 - Nếu có ít sound mà hay dùng nhiều thì tạo 1 lần vì tạo tốn thời gian và CPU

    const [isStartSpeechToText, setIsStartSpeechToText] = useState(false)

    useEffect(() => {
        onLoad()
        return (
            onEnd()
        )
    }, [])

    function onLoad() {
        // Voice
        Voice.onSpeechError = onSpeechError
        Voice.onSpeechResults = onSpeechResult

        // Guide
        setTimeout(() => {
            playQuestion()
        }, 3000)
        setTimeout(() => {
            playAnswer()
        }, 6000)
        setTimeout(() => {
            playHelp()
        }, 10000)
    }

    function onEnd() {
        Voice.destroy().then(Voice.removeAllListeners)
    }

    function onComplete() {
        //navigation.navigate('Reward')
        //Speech.stop()
        Alert.alert(
            title="Thông báo",
            message="Bé đã đọc đúng",
            buttons=[
                {
                    text: "Chọn màn chơi", 
                    onPress: async () => {
                        navigation.goBack()
                    }
                }
            ],
            options={
                cancelable: true
            }
        )
    }

    const [speechResult, setSpeechResult] = useState('')

    const startSpeechToText = async (e) => {
        if (!isStartSpeechToText) {
            await Voice.start("vi-VI")
        } else {
            await Voice.stop()
        }
        setIsStartSpeechToText((prev)  => !prev)
      }
    
      const onSpeechResult = (result) => {
        const newResult = result.value[0]
        if (checkSpeechAnswer(newResult, level.levelContent.word.alt)) {
            Speech.speak('Bé đã đọc đúng!')
            onComplete()
        } else {
            Speech.speak(`Bé đọc chưa chính xác! Bé hãy đọc lại từ ${level.levelContent.word.alt} `)
        }
        setSpeechResult(newResult)
      }
    
      const onSpeechError = (error) => {
        console.log(error)
      }

    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    const sentenceList = [
        level.levelContent.help.alt
        //level.levelContent.tips?.alt
    ]

    function playHelp() {
        Speech.speak(level.levelContent.help.alt), {
            voice: "vi-VN-language",
            rate: 1,
            pitch: 1
        }
    }

    const [sound, setSound] = useState() 

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require("./meoAudio.wav"))
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

    function playWord() {
        Speech.speak(level.levelContent.word.alt), {
            voice: "vi-VN-language",
            rate: 1,
            pitch: 1
        }
    }

    async function playQuestion() {
        Speech.speak(level.levelContent.question.alt, {
            voice: "vi-vn-x-vif-local",
            //rate: 0.75,
            //pitch: 1.1
        })
        const voices = await Speech.getAvailableVoicesAsync()
        //console.log(voices)
    }

    function playAnswer() {
        Speech.speak(level.levelContent.answer.alt)
    }

    return (
        <View>
            <Button title={isStartSpeechToText ? "Dừng nói" : "Nói"} onPress={(e) => startSpeechToText(e)} />
            <Text style={styles.text}>Bé: {speechResult}</Text>
            <TouchableOpacity onPress={playWord}>
                <Text style={styles.text}>{level.levelContent.word.alt}</Text>
                <Image 
                    //source={require("./meo.jpg")} 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={playQuestion} style={styles.container}>
                <AntDesign name="questioncircle" size={50} color="yellow" />
                <Text>{level.levelContent.question.alt}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playAnswer} style={styles.container}>
                <MaterialCommunityIcons name="baby-face" size={50} color="green" />
                <Text>{level.levelContent.answer.alt}</Text>
            </TouchableOpacity>
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
            <AIAssistant height={height} isPortrait={isPortrait} sentenceList={sentenceList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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