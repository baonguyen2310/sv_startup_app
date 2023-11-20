import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions, ImageBackground } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import AIAssistant from "../../components/AIAssitant"
import { checkSpeechAnswer } from "../../utils"
import Microphone from "../../components/Microphone"
import CompleteModal from "../../components/CompleteModal"
import { 
    playMain,
    playQuestion,
    playAnswer,
    playGuide,
    playReviewAnswer,
    playReviewSpeech,
    playTip
} from "../../utils/playSound"

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    // 1 - Nếu có nhiều sound thì nên tạo và giải phóng mỗi lần vì giữ tốn RAM
    // 2 - Nếu có ít sound mà hay dùng nhiều thì tạo 1 lần vì tạo tốn thời gian và CPU
    // Download lần đầu lưu vào máy để app vừa nhẹ vừa không phải download lại nhiều lần
    const [speechResult, setSpeechResult] = useState("")
    const [countWrong, setCountWrong] = useState(0)
    const maxWrong = 3
    const [showCompleteModal, setShowCompleteModal] = useState(false)
    

    // PLAYSOUND
    const [sound, setSound] = useState() // dùng 1 sound duy nhất để không bị chồng lên nhau

    async function playSound(uri) {
        //const { sound } = await Audio.Sound.createAsync(require("./meoAudio.wav"))
        const { sound } = await Audio.Sound.createAsync({ uri: uri })
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


    // ONLOAD
    useEffect(() => {
        const timeOutId_main = setTimeout(() => {
            playMain({ level, playSound })
        }, 1000)
        const timeOutId_guide = setTimeout(() => {
            playGuide({ level, index: 0, playSound })
        }, 2000)


        return (() => {
            clearTimeout(timeOutId_main)
            clearTimeout(timeOutId_guide)

            if (sound) {sound.unloadAsync()}
            Speech.stop()
        })
    }, [])


    // ONSPEECHRESULT
    useEffect(() => {
        if (speechResult != "") {
            if (checkSpeechAnswer(speechResult.result, level.levelContent.main.alt)) {
                playReviewSpeech({ level, status:'right', playSound })
                setTimeout(() => {
                    playTip({ level, index: 0, playSound })
                }, 2000)
                setTimeout(() => {
                    setShowCompleteModal(true)
                    playReviewSpeech({ level, status: 'complete', playSound })
                }, 2000)
            } else {
                if (countWrong < maxWrong) {
                    playReviewSpeech({ level, status: 'wrong', playSound })
                    setCountWrong(prev => prev + 1)
                } else {
                    setTimeout(() => {
                        playTip({ level, index: 0, playSound })
                    }, 2000)
                    setTimeout(() => {
                        setShowCompleteModal(true)
                        playReviewSpeech({ level, status: 'uncomplete', playSound })
                    }, 2000)
                }
            }
        }
    }, [speechResult])


    // AI ASSISTANT
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <ImageBackground source={{ uri: "https://i.ibb.co/TMs0FP4/game-1.jpg" }} resizeMode="cover" style={styles.containerBackground}>
            <CompleteModal
                modalVisible={showCompleteModal}
                setModalVisible={setShowCompleteModal}
                message={"Bé đã hoàn thành màn chơi!"}
                star={5-countWrong}
                navigation={navigation}
            />
            <TouchableOpacity onPress={ () => playMain({ level, playSound }) }>
                <Text style={styles.text}>{level.levelContent.main.alt}</Text>
                <Image 
                    //source={require("./meo.jpg")} 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.text}>Bé đã đọc: {speechResult.result}</Text>
            <Microphone setSpeechResult={setSpeechResult} />
            <AIAssistant 
                height={height} 
                isPortrait={isPortrait} 
                onPress={() => playGuide({ level, index: 0, playSound })}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerBackground: {
        backgroundColor: "skyblue",
        height: "100%",
        padding: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    image: {
        width: "100%",
        height: 200,
        borderWidth: 10,
        borderColor: 'pink',
        borderRadius: 20
    },
    video: {
        width: 300,
        height: 300
    }
})