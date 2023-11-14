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

export default function GameBody({ time = 30, requireScore = 100, level, navigation }) {
    level.levelContent.guides[0].alt = level.levelContent.guides[0].alt.replaceAll(/\\n/g, "\n")

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
        const timeOutId_question = setTimeout(() => {
            playGuide({ level, index: 0, playSound })
        }, 2000)

        return (() => {
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
                setTimeout(() => {
                    setShowCompleteModal(true)
                    playReviewSpeech({ level, status: 'complete', playSound })
                }, 2000)
            } else {
                if (countWrongSpeech < maxWrongSpeech) {
                    playReviewSpeech({ level, status: 'wrong', playSound })
                    setCountWrongSpeech(prev => prev + 1)
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
                star={ 
                    countWrongAnswer == maxWrongAnswer 
                    ? 2
                    : Math.round((5 - countWrongAnswer + 5 - countWrongSpeech)/2)
                }
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
                <Text style={styles.text}>{level.levelContent.main.alt}</Text>
            </TouchableOpacity>
            {
                showAnswers && (
                    <View>
                        <TouchableOpacity onPress={() => playGuide({ level, index: 0, playSound })} style={styles.container}>
                            <AntDesign name="questioncircle" size={50} color="yellow" />
                            <Text>{level.levelContent.guides[0].alt}</Text>
                        </TouchableOpacity>
                        {
                            level.levelContent.answers.map((answer, index) => (
                                <TouchableOpacity 
                                    style={index == selectedAnswerIndex ? styles.isSelected : styles.answer} 
                                    key={index} 
                                    onPress={() => handleSelectAnswer(index)} 
                                >
                                    <Image style={styles.image} source={{ uri: answer.imageUrl }} />
                                </TouchableOpacity>
                            ))
                        }
                        <Button title="Trả lời" onPress={handleSubmit} />
                    </View>
                )
            }
            {
                showCorrectAnswer && (
                    <View>
                        <Image 
                            style={styles.image} 
                            source={{ uri: level.levelContent.answers[level.levelContent.correctIndex].imageUrl }} 
                        />
                    </View>
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
        width: "100%",
        height: 150
    },
    video: {
        width: 300,
        height: 300
    },
    answer: {
        borderWidth: 1,
        width: "100%",
        padding: 10
    },
    isSelected: {
        borderColor: "blue",
        borderWidth: 5
    }
})