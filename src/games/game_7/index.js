import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import Draggable from "react-native-draggable"
import { Audio, Video, ResizeMode } from "expo-av"
import { shuffleArray, arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'
import AIAssistant from "../../components/AIAssitant"
import { generateRandomColors } from '../../utils/randomColor'
import { getBoxes, calculateDistance } from '../../utils/randomCoordinate'

export default function GameBody({ time, requireScore, level }) {
    const [boxes, setBoxes] = useState([])

    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState()

    const sentenceList = [
        level.levelContent.help.alt
        //level.levelContent.tips?.alt
    ]

    useEffect(() => {
        setTimeout(() => {
            playWord()
        }, 2000)

        // setInterval(() => {
        //     playWord()
        // }, 20000)
    }, [])

    const story = level.levelContent.story
    const shuffledStory = shuffleArray(story)
    const randomColorList = generateRandomColors(shuffledStory.length)

    useEffect(() => {
        const boxes = getBoxes(width, height, shuffledStory.length)
        newBoxes = boxes.map((box, index) => {
            return ({
                ...box,
                sentence: shuffledStory[index].alt,
                imageUrl: shuffledStory[index].imageUrl,
                color: randomColorList[index]
            })
        })
        setBoxes(newBoxes)
        console.log(newBoxes)
    }, [])

    function playWord() {
        Speech.speak(level.title), {
            voice: "vi-VN-language",
            rate: 1,
            pitch: 1
        }
    }

    async function playQuestion() {
        Speech.speak(level.levelContent.question.alt, {
            voice: "vi-vn-x-vif-local",
            rate: 0.75,
            //pitch: 1.1
        })
        const voices = await Speech.getAvailableVoicesAsync()
        //console.log(voices)
    }

    function handleSelect(sentence) {
        Speech.speak(sentence)
    }

    function handleSubmit() {
        const story = level.levelContent.story
        const sentenceList = story.map((sentence, index) => {
            return (
                sentence.alt
            )
        } )

        const sentenceListAnswer = []
        boxes.forEach((box) => {
            sentenceListAnswer.push(box.sentence)
        })

        if (arraysAreEqual(sentenceList, sentenceListAnswer)) {
            alert('Bé đã trả lời đúng!')
            Speech.speak('Bé đã trả lời đúng!')
        } else {
            alert('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
            Speech.speak('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={playWord}>
                <Text style={styles.text}>{level.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playQuestion} style={styles.container}>
                <AntDesign name="questioncircle" size={24} color="yellow" />
                <Text>{level.levelContent.question.alt}</Text>
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
                            onShortPressRelease={()=>handleSelect(box.sentence)}
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
                                temp = newBoxes[index].sentence
                                newBoxes[index].sentence = newBoxes[minDistanceIndex].sentence
                                newBoxes[minDistanceIndex].sentence = temp
                                
                                temp = newBoxes[index].imageUrl
                                newBoxes[index].imageUrl = newBoxes[minDistanceIndex].imageUrl
                                newBoxes[minDistanceIndex].imageUrl = temp

                                temp = newBoxes[index].color
                                newBoxes[index].color = newBoxes[minDistanceIndex].color
                                newBoxes[minDistanceIndex].color = temp
                                setBoxes(newBoxes)

                                //end swap

                            }}
                        >
                            {/* <Text style={styles.word}>{box.sentence}</Text> */}
                            <Image style={styles.image} source={{ uri: box.imageUrl }} />
                        </Draggable>
                    )
                })
            }
            </View>
            <Button style={styles.button} title="Trả lời" onPress={handleSubmit} />
            <AIAssistant height={height} isPortrait={isPortrait} sentenceList={sentenceList} />
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
        width: 100,
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