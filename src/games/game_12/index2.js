import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions, ImageBackground } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect, useRef } from "react"
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';
import AIAssistant from "../../components/AIAssitant"
import { checkSpeechAnswer } from "../../utils"
import Microphone from "../../components/Microphone"
import CompleteModal from "../../components/CompleteModal"
import SubmitButton from "../../components/SubmitButton"
import { 
    playMain,
    playQuestion,
    playAnswer,
    playGuide,
    playReviewAnswer,
    playReviewSpeech,
    playTip
} from "../../utils/playSound"

import HistoryServices from "../../services/firebase/HistoryServices"

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    const [guideIndex, setGuideIndex] = useState(0)

    const [showMicrophone, setShowMicrophone] = useState(false)
    const [speechResult, setSpeechResult] = useState("")
    const [countWrongSpeech, setCountWrongSpeech] = useState(0)
    const maxWrongSpeech = 3
    const [showCompleteModal, setShowCompleteModal] = useState(false)

    const startTime = useRef(null)
    const stars = Math.round((5 - countWrongSpeech)/2)

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
        startTime.current = new Date()

        // const timeOutId_main = setTimeout(() => {
        //     //playMain({ level, playSound })
        // }, 1000)
        const timeOutId_guide = setTimeout(() => {
            playGuide({ level, index: 0, playSound })
        }, 1000)

        return (() => {
            //clearTimeout(timeOutId_main)
            clearTimeout(timeOutId_guide)

            if (sound) {sound.unloadAsync()}
            Speech.stop()
        })
    }, [])


    // ONSPEECHRESULT
    useEffect(() => {
        if (speechResult != "") {
            if (checkSpeechAnswer(speechResult.result, level.levelContent.answers[level.levelContent.correctIndex].alt)) {
                playReviewSpeech({ level, status:'right', playSound })
                setTimeout(() => {
                    playTip({ level, index: 0, playSound })
                }, 2000)
                setTimeout(async () => {
                    setShowCompleteModal(true)
                    playReviewSpeech({ level, status: 'complete', playSound })

                    await HistoryServices.postHistory({
                        levelId: level.id,
                        gameId: level.gameId,
                        startTime: startTime.current,
                        endTime: new Date(),
                        completed: true,
                        stars: stars,
                        moreInfo: {
                            maxWrongAnswer, maxWrongSpeech, countWrongAnswer, countWrongSpeech
                        }
                    })
                }, 2000)
            } else {
                if (countWrongSpeech < maxWrongSpeech) {
                    playReviewSpeech({ level, status: 'wrong', playSound })
                    setCountWrongSpeech(prev => prev + 1)
                } else {
                    setTimeout(() => {
                        playTip({ level, index: 0, playSound })
                    }, 2000)
                    setTimeout(async () => {
                        setShowCompleteModal(true)
                        playReviewSpeech({ level, status: 'uncomplete', playSound })

                        await HistoryServices.postHistory({
                            levelId: level.id,
                            gameId: level.gameId,
                            startTime: startTime,
                            endTime: new Date(),
                            completed: false,
                            stars: stars,
                            moreInfo: {
                                maxWrongSpeech, countWrongSpeech
                            }
                        })
                    }, 2000)
                }
            }
        }
    }, [speechResult])

    // AI ASSISTANT
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width
    

    // ANSWER
    function handleMessage(e){
        const message = JSON.parse(e.nativeEvent.data);
        console.log('Received message from WebView:', message);
    }

    // WEBVIEW
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
        <ImageBackground source={{ uri: "https://i.ibb.co/TMs0FP4/game-1.jpg" }} resizeMode="cover" style={styles.containerBackground}>
            <CompleteModal
                modalVisible={showCompleteModal}
                setModalVisible={setShowCompleteModal}
                message={"Bé đã hoàn thành màn chơi"}
                star={ stars }
                navigation={navigation}
            />
            {
                !showMicrophone && (
                    <WebView
                        style={styles.container}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        javaScriptEnabled={true}
                        onMessage={handleMessage}
                        source={{ uri: level.levelContent.main.url }}
                    />
                )
            }
            {
                showMicrophone && (
                    <Microphone setSpeechResult={setSpeechResult} />
                )
            }
            {
                showMicrophone && (
                    <TouchableOpacity onPress={ () => playGuide({ level, index: 0, playSound }) }>
                        <Image 
                            source={{ uri: level.levelContent.imageUrl }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )
            }
            {
                showMicrophone && (
                    <Text style={styles.text}>Bé: {speechResult.result}</Text>
                )
            }
            <AIAssistant 
                height={height} 
                isPortrait={isPortrait} 
                onPress={() => playGuide({ level, index: guideIndex, playSound })}
            />
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    containerBackground: {
        backgroundColor: "skyblue",
        height: "100%",
        padding: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    textAnswer: {
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        color: '#FF3FA4',
    },
    answer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 5,
        width: "100%",
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 5,
        padding: 10,
        color: '#FF3FA4',
        borderWidth: 5,
        borderColor: '#F699CD'
    },
    isSelected: {
        flexDirection: "row",
        justifyContent: "flex-start",
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        backgroundColor: "pink",
        borderRadius: 20,
        marginBottom: 5,
        padding: 10,
        color: '#FF3FA4',
        borderWidth: 5,
        borderColor: "#FF10F0"
    },
    button: {
        padding: 10
    }
})