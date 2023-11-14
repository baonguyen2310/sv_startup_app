import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { Audio, Video, ResizeMode } from "expo-av"
import { arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech'
import Voice from '@react-native-voice/voice'
import AIAssistant from "../../components/AIAssitant"
import { checkSpeechAnswer } from "../../utils"
import Microphone from "../../components/Microphone"
import CompleteModal from "../../components/CompleteModal"
import {
    playSoundOrAlt,
    playMain,
    playQuestion,
    playAnswer,
    playGuide,
    playReviewAnswer,
    playReviewSpeech,
    playTip,

    playSoundOrAltAsync,
    playMainAsync,
    playQuestionAsync,
    playAnswerAsync,
    playGuideAsync,
    playReviewAnswerAsync,
    playReviewSpeechAsync,
    playTipAsync
} from "../../utils/playSound"

export default function GameBody({ time, requireScore, level, navigation }) {
    const [guideIndex, setGuideIndex] = useState(0)
    const [showGuide, setShowGuide] = useState(true)

    const [pictureIndex, setPictureIndex] = useState(0)
    const [showPicture, setShowPicture] = useState(false)

    const [showPictureElements, setShowPictureElements] = useState(false)

    const [selectedMapIndex, setSelectedMapIndex] = useState()
    const [showMap, setShowMap] = useState(false)

    const [countWrongAnswer, setCountWrongAnswer] = useState(0)
    const maxWrongAnswer = 2
    const [showAnswers, setShowAnswers] = useState(true)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

    const [showMicrophone, setShowMicrophone] = useState(true)
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
        // Main
        const timeOutId_main = setTimeout(() => {
            playMain({ level, playSound })
        }, 1000)
        // Guide
        const timeOutId_guide_0 = setTimeout(() => {
            setGuideIndex(0)
            playGuide({ level, index: 0, playSound })
        }, 2000)
        const timeOutId_guide_1 = setTimeout(() => {
            setGuideIndex(1)
            playGuide({ level, index: 1, playSound })
            setShowGuide(false)
        }, 10000)
        const timeOutId_guide_2 = setTimeout(async () => {
            setGuideIndex(2)
            await playGuideAsync({ level, index: 2, playSound })

            // Picture Story
            // forEach không hỗ trợ async/await
            setShowPicture(true)
            for (let index = 0; index < level.levelContent.story.picture_story.length; index++) {
                setPictureIndex(index)
                await playPictureAsync(index)
            }
            setShowPicture(false)
            
            // Picture elements
            setShowPictureElements(true)
            await playGuideAsync({ level, index: 3, playSound })
            await playGuideAsync({ level, index: 4, playSound })
        }, 20000)

        return (() => {
            clearTimeout(timeOutId_main)
            clearTimeout(timeOutId_guide_0)
            clearTimeout(timeOutId_guide_1)
            clearTimeout(timeOutId_guide_2)

            if (sound) {sound.unloadAsync()}
            Speech.stop()
        })
    }, [])


    // ONSPEECHRESULT
    useEffect(() => {
        if (speechResult != "" && showMap) {
            if (checkSpeechAnswer(speechResult.result, level.levelContent.story.map_story[selectedMapIndex].alt)) {
                playReviewSpeech({ level, status:'right', playSound })
            } else {
                playReviewSpeech({ level, status: 'wrong', playSound })
            }
        }
    }, [speechResult])

    // AI ASSISTANT
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    async function playPictureAsync(index) {
        await playSoundOrAltAsync({ content: level.levelContent.story.picture_story[index], playSound })
    }

    function handleSelectPictureElement(picture_element) {
        Speech.speak(picture_element.alt)
    }

    function handleReady() {
        setShowPictureElements(false)
        setShowMap(true)
    }

    function handleSelect(value, index) {
        setSelectedMapIndex(index)
        if (value.type == "text") {
            Speech.speak(value.alt)
        }
    }

    function handleSubmit() {

    }

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
            <Text style={styles.text}>{level.levelContent.main.alt}</Text>
            {
                showGuide && (
                    <View style={styles.guideContainer}>
                        <Text>{level.levelContent.guides[guideIndex].alt}</Text>
                    </View>
                )
            }
            {
                showPicture && (
                    <View style={styles.game}>
                        <Image style={styles.picture} source={{ uri: level.levelContent.story.picture_story[pictureIndex].imageUrl}} />
                    </View>
                )
            }
            {
                showPictureElements && (
                    <View style={styles.mapContainer}>
                    {
                        level.levelContent.story.picture_elements.map((picture_element, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleSelectPictureElement(picture_element)} >
                                    <Image source={{ uri: picture_element.imageUrl }} style={styles.image} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    <Button title="Sẵn sàng" onPress={handleReady} />
                    </View>
                )
            }
            {
                showMap && (
                    <View style={styles.mapContainer}>
                    {
                        level.levelContent.story.map_story.map((value, index) => {
                            if (value.type == "text") {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handleSelect(value, index)} >
                                        <Text style={{ borderWidth: selectedMapIndex == index ? 5 : 0 }}>{value.alt}</Text> 
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handleSelect(value, index)} >
                                        <Image source={{ uri: value.imageUrl }} style={{ ...styles.image, borderWidth: selectedMapIndex == index ? 5 : 0 }} />
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                    </View>
                )
            }
            <Button style={styles.button} title="Lưu câu chuyện" />
            <Button style={styles.button} title="Hoàn thành" onPress={handleSubmit}/>
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
        width: 100,
        height: 100,
        borderColor: "blue"
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
    guideContainer: {
        
    },
    guideImage: {
        width: 200,
        height: 200
    },
    picture: {
        width: 200,
        height: 200
    },
    mapContainer: {
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    }
})