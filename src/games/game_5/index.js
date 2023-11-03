import { Text, View, StyleSheet, TouchableOpacity, Image, Button, useWindowDimensions } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av"
import { useState, useEffect } from "react"
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'
import AIAssistant from "../../components/AIAssitant"

export default function GameBody({ time = 30, requireScore = 100, level }) {
    // 1 - Nếu có nhiều sound thì nên tạo và giải phóng mỗi lần vì giữ tốn RAM
    // 2 - Nếu có ít sound mà hay dùng nhiều thì tạo 1 lần vì tạo tốn thời gian và CPU

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

    //console.log(level.levelContent.imageUrl)

    function playWord() {
        Speech.speak(level.levelContent.sentence.alt), {
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

    function handleSelect(answer) {
        Speech.speak(answer.alt)
        setSelectedAnswerIndex(answer.index)
        console.log(answer.index)
    }

    function handleSubmit() {
        if (selectedAnswerIndex == level.levelContent.correctIndex) {
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
                <Text style={styles.text}>{level.levelContent.sentence.alt}</Text>
                <Image 
                    //source={require("./meo.jpg")} 
                    source={{ uri: level.levelContent.imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={playQuestion} style={styles.container}>
                <AntDesign name="questioncircle" size={50} color="yellow" />
                <Text>{level.levelContent.question.alt}</Text>
            </TouchableOpacity>
            {
                level.levelContent.answers.map((answer) => (
                    <TouchableOpacity 
                        style={answer.index == selectedAnswerIndex ? styles.isSelected : styles.answer} 
                        key={answer.index} 
                        onPress={() => handleSelect(answer)} 
                    >
                        <MaterialCommunityIcons name="baby-face" size={50} color="green" />
                        <Text>{answer.alt}</Text>
                    </TouchableOpacity>
                ))
            }
            <Button title="Trả lời" onPress={handleSubmit} />
            <AIAssistant height={height} isPortrait={isPortrait} sentenceList={sentenceList} />
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