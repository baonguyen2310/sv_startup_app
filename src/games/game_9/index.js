import { Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions, Button, ScrollView, ActivityIndicator, ImageBackground } from "react-native"
import { useState, useEffect } from "react"
import { Audio, Video, ResizeMode } from "expo-av"
import { arraysAreEqual } from "../../utils"
import { AntDesign } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import Voice from '@react-native-voice/voice'
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
import ChatGPTServices from "../../services/api/ChatGPTServices"

function Box({ box }) {
    return (
        <View style={styles.boxContainer}>
            <Image style={styles.boxImage} source={{ uri: box.imageUrl }} />
        </View>
    )
}

export default function GameBody({ time, requireScore, level, navigation }) {
    const [guideIndex, setGuideIndex] = useState(0)
    const [showGuide, setShowGuide] = useState(true)
    const [showBoxList, setShowBoxList] = useState(true)

    const [showMicrophone, setShowMicrophone] = useState(false)
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
        
    }, [speechResult])

    // AI ASSISTANT
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width
    

    // CARDSET TURNS
    // Object.keys không đảm bảo thứ tự của các key
    // 1 số hàm khá hay: Object.fromEntries, Object.entries
    const [cardSetTurnIndex, setCardSetTurnIndex] = useState(0)
    const [selectedBoxStory, setSelectedBoxStory] = useState(
        level.levelContent.cardSet.map((value) => (
            { type: value.type, selectedBoxIndex: 0 }
        ))
    )

    // BOX
    const [selectedBoxIndex, setSelectedBoxIndex] = useState()

    // STORY
    const [showSelectedBoxStory, setShowSelectedBoxStory] = useState(false)

    function handleSelect(index) {
        setSelectedBoxIndex(index)

        const newSelectedBoxStory = { ...selectedBoxStory }
        newSelectedBoxStory[cardSetTurnIndex].selectedBoxIndex = index
        setSelectedBoxStory(newSelectedBoxStory)
    }

    function handleNext() {
        setGuideIndex(prev => prev + 1)
        if (cardSetTurnIndex < level.levelContent.cardSet.length - 1) {
            playGuide({ level, index: guideIndex + 1, playSound })
            setCardSetTurnIndex(prev => prev + 1)
        } else {
            setShowBoxList(false)
            setShowSelectedBoxStory(true)
            setShowMicrophone(true)
            playGuide({ level, index: 4, playSound })
        }
    }

    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (speechResult != "") {
            setLoading(true)
            
            //const reviewStory = await ChatGPTServices.reviewStory({ story: "Dạo ở xứ sở Mây, có chú gấu tên là Bông. Bông muốn làm bạn với những chú cún sói biết nói, nhưng chúng lại thích húc cùng mèo hổ. Chú gấu buồn quá, nhưng mỗi khi nhớ đến bóng mây trắng, Bông biến thành siêu gấu có cánh bay lượn trên trời. " })
            const reviewStory = await ChatGPTServices.reviewStory({ story: speechResult.result })
            console.log(reviewStory.choices[0].message.content)
            Speech.speak(reviewStory.choices[0].message.content)
            setLoading(false)
            setTimeout(() => {
                setShowCompleteModal(true)
                playReviewSpeech({ level, status: 'complete', playSound })
            }, 10000)
        }
    }

    return (
        <ImageBackground source={require("../../assets/images/background_game.jpg")} resizeMode="cover" style={styles.containerBackground}>
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
            {/* <Text style={styles.text}>{level.levelContent.main.alt}</Text> */}
            {
                showGuide && !showMicrophone && (
                    <View style={styles.guideContainer}>
                        <Text style={styles.question}>{level.levelContent.guides[guideIndex].alt}</Text>
                    </View>
                )
            }
            {
                showBoxList && (
                    <View style={styles.game}>
                        <View style={styles.boxListContainer}>
                            {
                                level.levelContent.cardSet[cardSetTurnIndex].data.map((box, index) => {
                                    return (
                                        <TouchableOpacity 
                                            style={selectedBoxIndex == index ? styles.isSelected : styles.isUnSelected} 
                                            onPress={() => handleSelect(index)} 
                                            key={index}
                                        >
                                            <Box box={box}/>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <SubmitButton onPress={handleNext} />
                    </View>
                )
            }
            {
                showSelectedBoxStory && (
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <View>
                            <View style={styles.boxSelected}>
                                <Box box={level.levelContent.cardSet[0].data[selectedBoxStory[0].selectedBoxIndex]} />
                            </View>
                            <View style={styles.boxSelected}>
                                <Box box={level.levelContent.cardSet[1].data[selectedBoxStory[1].selectedBoxIndex]} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.boxSelected}>
                                <Box box={level.levelContent.cardSet[2].data[selectedBoxStory[2].selectedBoxIndex]} />
                            </View>
                            <View style={styles.boxSelected}>
                                <Box box={level.levelContent.cardSet[3].data[selectedBoxStory[3].selectedBoxIndex]} />
                            </View>
                        </View>
                    </View>
                )
            }
            {
                loading && (
                    <View style={styles.loaderContainer}>
                        <Image style={{ width: 300, height: 300 }} source={require("../../assets/images/loading.gif")} />
                    </View>
                )
            }
            {
                showMicrophone && (
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text_secondary}>Bé: {speechResult.result}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <SubmitButton onPress={handleSubmit} />
                            <TouchableOpacity>
                                <Image style={styles.imageSave} source={require("../../assets/images/save.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
    boxListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center"
    },
    boxContainer: {

    },
    boxImage: {
        width: 100,
        height: 100
    },
    containerBackground: {
        backgroundColor: "skyblue",
        height: "100%",
        padding: 10
    },
    container: {
        flexDirection: 'row'
    },
    question: {
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        backgroundColor: "#313866",
        borderRadius: 20,
        marginVertical: 10,
        color: 'pink',
        borderWidth: 2,
        borderColor: 'pink',
        padding: 20,
        textAlignVertical: "center"
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
    text_secondary: {
        fontSize: 16,
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
    imageSave: {
        width: 110,
        height: 110,
        marginLeft: 20
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
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
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
    },
    loaderContainer: {
        position: 'absolute',
        zIndex: 99,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Một màu trắng có độ trong suốt để làm nền cho ActivityIndicator
    },
    isSelected: {
        backgroundColor: "pink",
        color: '#FF3FA4',
        borderWidth: 10,
        //margin: 5,
        borderColor: "#FF10F0"
    },
    isUnSelected: {
        backgroundColor: "pink",
        //margin: 5,
        borderWidth: 10,
        borderColor: "#F699CD"
    },
    boxSelected: {
        backgroundColor: "pink",
        margin: 5,
        borderWidth: 10,
        borderColor: "#F699CD"
    },
})