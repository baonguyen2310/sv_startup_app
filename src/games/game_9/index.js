import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { Audio, Video, ResizeMode } from "expo-av"
import { arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech'
import Voice from '@react-native-voice/voice'
import AIAssistant from "../../components/AIAssitant"
import { checkSpeechAnswer } from "../../utils"

function Box({ box }) {
    return (
        <View style={styles.boxContainer}>
            <Image style={styles.boxImage} source={{ uri: box.imageUrl }} />
        </View>
    )
}

export default function GameBody({ time, requireScore, level }) {
    const [isShowBoxList, setIsShowBoxList] = useState(false)
    const boxListNames = ['context', 'main', 'sub', 'tool']
    const [boxListNameIndex, setBoxListNameIndex] = useState(0)
    const boxListName = boxListNames[boxListNameIndex]
    const [selectedBoxStory, setSelectedBoxStory] = useState({
        'context': 0, 'main': 0, 'sub': 0, 'tool': 0
    })
    const [selectedBoxIndex, setSelectedBoxIndex] = useState()
    const [isShowSelectedBoxStory, setIsShowSelectedBoxStory] = useState(false)


    const [isStartSpeechToText, setIsStartSpeechToText] = useState(false)
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)
    const [isShowPicture, setIsShowPicture] = useState(false)
    const [currentGuideIndex, setCurrentGuideIndex] = useState(0)
    const [isShowGuide, setIsShowGuide] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isShowQuestion, setIsShowQuestion] = useState(false)

    const [selectedMapIndex, setSelectedMapIndex] = useState()
    const [isShowMap, setIsShowMap] = useState(false)

    const [isSubmit, setIsSubmit] = useState(false)

    // Change Speech.speak to Promise
    function speakAndAwait(text) {
        return new Promise((resolve) => {
            Speech.speak(
                text,
                {
                    onDone: resolve
                }
            )
        })
    }

    // useEffect này chỉ chạy 1 lần đầu khi mount, nên nó chỉ biết các biến trong phạm vi lần đầu
    // các biến hoặc state thay đổi thì các hàm có liên quan trong useEffect này không hề biết
    useEffect(() => {
        // Voice
        Voice.onSpeechError = onSpeechError
        Voice.onSpeechResults = onSpeechResult

        setIsShowGuide(true)
        setCurrentGuideIndex(0)
        setIsShowBoxList(true)

        //onLoad()
        return (
            onEnd()
        )
    }, [])

    async function onLoad() {
        // Title
        await playTitle()

        // Question 0
        setIsShowQuestion(true)
        setCurrentQuestionIndex(0)
        await playQuestion(0)
        // stop after 5s
        await new Promise((resolve) => setTimeout((resolve), 5000))
        setIsShowQuestion(false)

        // Question 1
        setIsShowQuestion(true)
        setCurrentQuestionIndex(1)
        await playQuestion(1)
        // stop after 5s
        await new Promise((resolve) => setTimeout((resolve), 5000))
        setIsShowQuestion(false)

        // Guide 0
        setIsShowGuide(true)
        setCurrentGuideIndex(0)
        await playGuide(0)
        setIsShowGuide(false)

        // forEach không hỗ trợ async/await
        // Picture 
        setIsShowPicture(true)
        for (let index = 0; index < level.levelContent.story.picture_story.length; index++) {
            setCurrentPictureIndex(index);
            await playPicture(index);
        }
        setIsShowPicture(false)

        //Map
        setIsShowMap(true)
    }

    function onEnd() {
        Voice.destroy().then(Voice.removeAllListeners)
        Speech.stop()
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

    async function startSpeechToText() {
        if (!isStartSpeechToText) {
            await Voice.start("vi-VI")
        } else {
            await Voice.stop()
        }
        setIsStartSpeechToText((prev)  => !prev)
      }

      const onSpeechResult = (result) => {
        const newResult = result.value[0]
        setSpeechResult(newResult)
        }

      const onSpeechError = (error) => {
        console.log(error)
      }

    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    const sentenceList = []
    level.levelContent.help.map((help) => {
        sentenceList.push(help.alt)
    })

    async function playGuide(index) {
        // Speech.speak(level.levelContent.guide[index].alt), {
        //     voice: "vi-VN-language",
        //     rate: 1,
        //     pitch: 1,
        //     // onStopped: () => {

        //     // }
        // }
        await speakAndAwait(level.levelContent.guide[index].alt)
    }

    async function playTitle() {
        //Speech.speak(level.title)
        await speakAndAwait(level.title)
    }

    function playWord() {
        Speech.speak(level.title), {
            voice: "vi-VN-language",
            rate: 1,
            pitch: 1
        }
    }

    async function playQuestion(index) {
        // Speech.speak(level.levelContent.questions[index].alt, {
        //     voice: "vi-vn-x-vif-local",
        //     rate: 0.75,
        //     //pitch: 1.1
        // })
        //const voices = await Speech.getAvailableVoicesAsync()
        //console.log(voices)

        await speakAndAwait(level.levelContent.questions[index].alt)
    }

    async function playPicture(index) {
        //Speech.speak(level.levelContent.story.picture_story[index].text)
        await speakAndAwait(level.levelContent.story.picture_story[index].text)
    }

    async function handleNext() {
        if (boxListNameIndex < boxListNames.length - 1) {
            setBoxListNameIndex((prev) => prev + 1)
            setCurrentGuideIndex((prev) => prev + 1)
        } else {
            setIsShowBoxList(false)
            setIsShowSelectedBoxStory(true)
        }
    }

    function handleSubmit() {
        startSpeechToText()
    }

    function handleSelect(index) {
        const newSelectedBoxStory = { ...selectedBoxStory }
        newSelectedBoxStory[boxListName] = index
        setSelectedBoxStory(newSelectedBoxStory)
        setSelectedBoxIndex(index)
    }

    return (
        <View>
            <Button title={isStartSpeechToText ? "Dừng nói" : "Nói"} onPress={startSpeechToText} />
            <Text style={styles.text}>Bé: {speechResult}</Text>
            <TouchableOpacity onPress={playWord}>
                <Text style={styles.text}>{level.title}</Text>
            </TouchableOpacity>
            {
                isShowGuide && (
                    <View style={styles.guideContainer}>
                        <Text>{level.levelContent.guide[currentGuideIndex].alt}</Text>
                    </View>
                )
            }
            {
                isShowBoxList && (
                    <View style={styles.game}>
                        <View style={styles.boxListContainer}>
                            {
                                level.levelContent.cardSet[boxListName].map((box, index) => {
                                    return (
                                        <TouchableOpacity 
                                            style={{ borderWidth: selectedBoxIndex == index ? 5 : 0 }} 
                                            onPress={() => handleSelect(index)} 
                                            key={index}
                                        >
                                            <Box box={box}/>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Button title="Tiếp theo" onPress={handleNext} />
                    </View>
                )
            }
            {
                isShowSelectedBoxStory && (
                    <View style={styles.game}>
                        <Text>Bối cảnh</Text>
                        <Box box={level.levelContent.cardSet['context'][selectedBoxStory['context']]} />
                        <Text>Nhân vật chính</Text>
                        <Box box={level.levelContent.cardSet['main'][selectedBoxStory['main']]} />
                        <Text>Nhân vật phụ</Text>
                        <Box box={level.levelContent.cardSet['sub'][selectedBoxStory['sub']]} />
                        <Text>Công cụ</Text>
                        <Box box={level.levelContent.cardSet['tool'][selectedBoxStory['tool']]} />
                    </View>
                )
            }
            <Button style={styles.button} title="Kể toàn bộ câu chuyện" onPress={handleSubmit} />
            <AIAssistant height={height} isPortrait={isPortrait} sentenceList={sentenceList} />
        </View>
    )
}

const styles = StyleSheet.create({
    boxListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxContainer: {

    },
    boxImage: {
        width: 100,
        height: 100
    },
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