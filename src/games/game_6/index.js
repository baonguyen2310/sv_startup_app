import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button } from "react-native"
import { useState, useEffect } from "react"
import Draggable from "react-native-draggable"
import { Audio, Video, ResizeMode } from "expo-av"
import { shuffleArray, arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

import { generateRandomColors } from '../../utils/randomColor'
import { getBoxes, calculateDistance } from '../../utils/randomCoordinate'



export default function GameBody({ time, requireScore, level, navigation }) {
    const [guideIndex, setGuideIndex] = useState(0)

    const [countWrongAnswer, setCountWrongAnswer] = useState(0)
    const maxWrongAnswer = 2

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

    // SENTENCE
    const [boxes, setBoxes] = useState([])

    const sentence = level.levelContent.main.alt
    const wordList = sentence.split(" ")
    const shuffledWordList = shuffleArray(wordList)
    const randomColorList = generateRandomColors(wordList.length)

    useEffect(() => {
        const boxes = getBoxes(width, height, wordList.length)
        newBoxes = boxes.map((box, index) => {
            return ({
                ...box,
                word: shuffledWordList[index],
                color: randomColorList[index]
            })
        })
        setBoxes(newBoxes)
    }, [])

    function handleSelect(word) {
        Speech.speak(word)
    }

    function handleSubmit() {
        const sentence = level.levelContent.main.alt
        const wordList = sentence.split(" ")
        const wordListAnswer = []
        boxes.forEach((box) => {
            wordListAnswer.push(box.word)
        })

        if (arraysAreEqual(wordList, wordListAnswer)) {
            alert('Bé đã trả lời đúng!')
            playReviewAnswer({ level, status: 'right', playSound })
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
                <Image 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playGuide({ level, index: 0, playSound })} style={styles.container}>
                <AntDesign name="questioncircle" size={50} color="yellow" />
                <Text>{level.levelContent.guides[0].alt}</Text>
            </TouchableOpacity>
            <View style={styles.game}>
            {
                boxes.map((box, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                ...styles.box,
                                left: box.x,
                                top: box.y
                            }}
                        >
                        </View>
                    )
                })
            }
            {
                boxes.map((box, index) => {
                    return (
                        <Draggable 
                            key={index}
                            minX={0}
                            maxX={width}
                            minY={0}
                            maxY={height*0.55}
                            x={box.x} 
                            y={box.y} 
                            renderSize={56} 
                            renderColor={box.color}
                            //renderText={word}
                            isCircle={false}
                            shouldReverse={true}
                            onShortPressRelease={()=>handleSelect(box.word)}
                            onDragRelease={(e, gestureState) => {
                                const x = e.nativeEvent.pageX - e.nativeEvent.locationX
                                const y = e.nativeEvent.pageY - e.nativeEvent.locationY-300
                                //console.log(`X: ${x}, Y: ${y}`)
                                minDistance = calculateDistance(x, y, boxes[0].x, boxes[0].y)
                                minDistanceIndex = 0
                                for (let i = 0; i < boxes.length; i++) {
                                    if (minDistance > calculateDistance(x, y, boxes[i].x, boxes[i].y)) {
                                        minDistance = calculateDistance(x, y, boxes[i].x, boxes[i].y)
                                        minDistanceIndex = i
                                    }
                                }
                                //console.log(minDistanceIndex)

                                // swap 2 box: swap chữ và swap màu
                                const newBoxes = [...boxes]
                                temp = newBoxes[index].word
                                newBoxes[index].word = newBoxes[minDistanceIndex].word
                                newBoxes[minDistanceIndex].word = temp
                                temp = newBoxes[index].color
                                newBoxes[index].color = newBoxes[minDistanceIndex].color
                                newBoxes[minDistanceIndex].color = temp
                                setBoxes(newBoxes)

                            }}
                        >
                            <Text style={styles.word}>{box.word}</Text>
                        </Draggable>
                    )
                })
            }
            </View>
            <Button title="Trả lời" onPress={handleSubmit} />
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
        flexDirection: 'row'
    },
    text: {
        fontSize: 24,
        fontWeight: "bold"
    },
    image: {
        width: 200,
        height: 100
    },
    video: {
        width: 300,
        height: 300
    },
    word: {
        fontSize: 24,
        width: 100,
        height: 100,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    game: {
        height: "70%"
    },
    button: {
        
    },
    box: {
        borderWidth: 1,
        borderStyle: 'dashed',
        position: 'absolute',
        width: 100,
        height: 100
    }
})