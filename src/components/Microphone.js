import { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Voice from '@react-native-voice/voice'
import { FontAwesome5 } from '@expo/vector-icons'

export default function Microphone({ setSpeechResult }) {
    const [isStartSpeechToText, setIsStartSpeechToText] = useState(false)

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults
        Voice.onSpeechError = onSpeechError
        return (() => {
            Voice.destroy().then(Voice.removeAllListeners())
        })
    }, [])

    function onSpeechResults(result) {
        const newResult = result.value[0]
        setSpeechResult(newResult)
    }

    // có thể chỗ này cũng phải trả về là sai
    function onSpeechError(error) {
        console.log(error)
    }

    function startSpeechToText() {
        if (!isStartSpeechToText) {
            Voice.start("vi-VI")
        } else {
            Voice.stop()
        }
        setIsStartSpeechToText(prev => !prev)
    }

    return(
        <TouchableOpacity onPress={startSpeechToText} style={styles.container}>
            <FontAwesome5 
                name="microphone-alt" 
                size={60} 
                color={ isStartSpeechToText ? "#45FFCA" : "#FAF3F0" }/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})