import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { Audio, Video, ResizeMode } from "expo-av"
import { arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech'
import Voice from '@react-native-voice/voice'
import AIAssistant from "../../components/AIAssitant"
import { checkSpeechAnswer } from "../../utils"


export default function GameBody({ time, requireScore, level }) {
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


        setIsShowMap(true)

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

        useEffect(() => {
            if (isShowMap) { // đã hiển thị map
                // trick
                if (speechResult.length < 100) { // đọc theo câu
                    if (checkSpeechAnswer(speechResult, level.levelContent.story.map_story[selectedMapIndex].text)) {
                        Speech.speak('Bé đã đọc đúng!')
                        //onComplete()
                    } else {
                        Speech.speak('Bé đọc chưa đúng')
                        //Speech.speak(`Bé đọc chưa chính xác! Bé hãy đọc lại từ ${level.levelContent.word.alt} `)
                    }
                } else { // đọc toàn bộ
                    
                }
            }
        }, [speechResult])

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

    async function handleNextPicture() {
        setCurrentPictureIndex((prev) => prev + 1)
        await playPicture(currentPictureIndex + 1)
    }

    function handleSelect(sentence, index) {
        setSelectedMapIndex(index)
        Speech.speak(sentence)
    }

    function handleSubmit() {
        //setIsSubmit(prev => !prev)
        //console.log(isSubmit)
        startSpeechToText()
        //const story = level.levelContent.story
        // const sentenceList = story.map((sentence, index) => {
        //     return (
        //         sentence.alt
        //     )
        // } )

        // const sentenceListAnswer = []
        // boxes.forEach((box) => {
        //     sentenceListAnswer.push(box.sentence)
        // })

        // if (arraysAreEqual(sentenceList, sentenceListAnswer)) {
        //     alert('Bé đã trả lời đúng!')
        //     Speech.speak('Bé đã trả lời đúng!')
        // } else {
        //     alert('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
        //     Speech.speak('Câu trả lời của bé chưa chính xác, bé hãy chọn lại câu trả lời!')
        // }
    }

    return (
        <View>
            <Button title={isStartSpeechToText ? "Dừng nói" : "Nói"} onPress={startSpeechToText} />
            <Text style={styles.text}>Bé: {speechResult}</Text>
            <TouchableOpacity onPress={playWord}>
                <Text style={styles.text}>{level.title}</Text>
            </TouchableOpacity>
            {
                isShowQuestion && (
                    <TouchableOpacity onPress={playQuestion} style={styles.container}>
                        <AntDesign name="questioncircle" size={24} color="yellow" />
                        <Text>{level.levelContent.questions[currentQuestionIndex].alt}</Text>
                    </TouchableOpacity>
                )
            }
            {
                isShowGuide && (
                    <View style={styles.guideContainer}>
                        <Text>{level.levelContent.guide[currentGuideIndex].alt}</Text>
                        <Image style={styles.guideImage} source={{ uri: level.levelContent.imageUrl }} />
                    </View>
                )
            }
            {
                isShowPicture && (
                    <View style={styles.game}>
                        <Image style={styles.picture} source={{ uri: level.levelContent.story.picture_story[currentPictureIndex].imageUrl}} />
                        <Button title="Tiếp theo" onPress={handleNextPicture} />
                    </View>
                )
            }
            {
                isShowMap && (
                    <View style={styles.mapContainer}>
                    {
                        level.levelContent.story.map_story.map((value, index) => {
                            if (value.imageUrl == "") {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handleSelect(value.text, index)} >
                                        <Text>{value.text}</Text> 
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handleSelect(value.text, index)} >
                                        <Image source={{ uri: value.imageUrl }} style={styles.image} />
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                    </View>
                )
            }
            <Button style={styles.button} title="Kể toàn bộ câu chuyện" onPress={handleSubmit} />
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