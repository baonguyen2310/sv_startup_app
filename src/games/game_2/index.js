import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions, ImageBackground } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect, useRef } from "react"
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
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

    const [countWrongAnswer, setCountWrongAnswer] = useState(0)
    const maxWrongAnswer = 2
    const [showAnswers, setShowAnswers] = useState(true)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

    const [showMicrophone, setShowMicrophone] = useState(false)
    const [speechResult, setSpeechResult] = useState("")
    const [countWrongSpeech, setCountWrongSpeech] = useState(0)
    const maxWrongSpeech = 3
    const [showCompleteModal, setShowCompleteModal] = useState(false)

    const startTime = useRef(null)
    const stars = countWrongAnswer == maxWrongAnswer ? 2 : Math.round((5 - countWrongAnswer + 5 - countWrongSpeech)/2)

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
                                maxWrongAnswer, maxWrongSpeech, countWrongAnswer, countWrongSpeech
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
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState()

    function handleSelectAnswer(index) {
        playAnswer({ level, index, playSound })
        setSelectedAnswerIndex(index)
    }

    function handleSubmit() {
        if (selectedAnswerIndex == level.levelContent.correctIndex) {
            //alert('Bé đã trả lời đúng!')
            playReviewAnswer({ level, status: 'right', playSound })
            setTimeout(() => {
                setShowAnswers(false)
                setShowCorrectAnswer(true)
            }, 2000)
            playGuide({ level, index: 1, playSound })
            setGuideIndex(1)
            setShowMicrophone(true)
        } else {
            if (countWrongAnswer < maxWrongAnswer) {
                //alert('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
                playReviewAnswer({ level, status: 'wrong', playSound })
                setCountWrongAnswer(prev => prev + 1)
            } else {
                setTimeout(() => {
                    setShowCompleteModal(true)
                    playReviewAnswer({ level, status: 'uncomplete', playSound })
                }, 2000)
            }
        }
    }

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
                showMicrophone && (
                    <Microphone setSpeechResult={setSpeechResult} />
                )
            }
            {/* <TouchableOpacity onPress={ () => playMain({ level, playSound }) }> */}
            <TouchableOpacity onPress={ () => playGuide({ level, index: 0, playSound }) }>
                <Image 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            {
                showAnswers && (
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => playQuestion({ level, index: 0, playSound })} style={styles.container}>
                            <Text style={styles.text}>{level.levelContent.questions[0].alt}</Text>
                        </TouchableOpacity>
                        {
                            level.levelContent.answers.map((answer, index) => (
                                <TouchableOpacity 
                                    style={index == selectedAnswerIndex ? styles.isSelected : styles.answer} 
                                    key={index} 
                                    onPress={() => handleSelectAnswer(index)} 
                                >
                                    <AntDesign name="caretright" size={50} color="skyblue" />
                                    <Text style={styles.textAnswer}>{answer.alt}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        <SubmitButton onPress={handleSubmit} />
                    </View>
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