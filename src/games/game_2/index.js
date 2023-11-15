import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect, useRef } from "react"
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

        const timeOutId_main = setTimeout(() => {
            playMain({ level, playSound })
        }, 1000)
        const timeOutId_question = setTimeout(() => {
            playGuide({ level, index: 0, playSound })
        }, 2000)

        return (() => {
            clearTimeout(timeOutId_main)
            clearTimeout(timeOutId_question)

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
            alert('Bé đã trả lời đúng!')
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
                alert('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
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
        <View>
            <CompleteModal
                modalVisible={showCompleteModal}
                setModalVisible={setShowCompleteModal}
                message={"Bé đã hoàn thành màn chơi với số sao là"}
                star={ stars }
                navigation={navigation}
            />
            {
                showMicrophone && (
                    <Microphone setSpeechResult={setSpeechResult} />
                )
            }
            <Text style={styles.text}>Bé: {speechResult.result}</Text>
            <Text>{countWrongSpeech}</Text>
            <TouchableOpacity onPress={ () => playMain({ level, playSound }) }>
                <Image 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            {
                showAnswers && (
                    <View>
                        <TouchableOpacity onPress={() => playQuestion({ level, index: 0, playSound })} style={styles.container}>
                            <AntDesign name="questioncircle" size={50} color="yellow" />
                            <Text>{level.levelContent.questions[0].alt}</Text>
                        </TouchableOpacity>
                        {
                            level.levelContent.answers.map((answer, index) => (
                                <TouchableOpacity 
                                    style={index == selectedAnswerIndex ? styles.isSelected : styles.answer} 
                                    key={index} 
                                    onPress={() => handleSelectAnswer(index)} 
                                >
                                    <MaterialCommunityIcons name="baby-face" size={50} color="green" />
                                    <Text>{answer.alt}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        <Button title="Trả lời" onPress={handleSubmit} />
                    </View>
                )
            }
            {
                showCorrectAnswer && (
                    <Text>{level.levelContent.answers[level.levelContent.correctIndex].alt}</Text>
                )
            }
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