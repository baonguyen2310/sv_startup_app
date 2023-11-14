import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions } from "react-native";
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
import SlideShow from "../../components/SlideShow"

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    const [guideIndex, setGuideIndex] = useState(0)

    const [pictureIndex, setPictureIndex] = useState(0)

    const [showMicrophone, setShowMicrophone] = useState(true)
    const [speechResult, setSpeechResult] = useState("")
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
            //playReviewSpeech({ level, status:'right', playSound })
        }
    }, [speechResult])

    // AI ASSISTANT
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <View>
            <CompleteModal
                modalVisible={showCompleteModal}
                setModalVisible={setShowCompleteModal}
                message={"Bé đã hoàn thành màn chơi với số sao là"}
                star={ 5 }
                navigation={navigation}
            />
            {
                showMicrophone && (
                    <Microphone setSpeechResult={setSpeechResult} />
                )
            }
            <Text style={styles.text}>Bé: {speechResult.result}</Text>
            <Text>{level.levelContent.main.alt}</Text>
            <SlideShow dataSource={level.levelContent.pictures} />
            <Button style={styles.button} title="Lưu câu chuyện" />
            <Button style={styles.button} title="Hoàn thành" />
            <AIAssistant 
                height={height} 
                isPortrait={isPortrait} 
                onPress={() => playGuide({ level, index: guideIndex, playSound })}
            />
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
    },
    answer: {
        borderWidth: 1,
        width: "100%"
    },
    isSelected: {
        borderColor: "blue",
        borderWidth: 5
    }
})