import { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
        setSpeechResult({
            result: result.value[0],
            timestamp: Date.now()
        })
    }

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
            {/* <FontAwesome5 
                name="microphone-alt" 
                size={80} 
                color={ isStartSpeechToText ? "#45FFCA" : "#FAF3F0" }/> */}
            {
                isStartSpeechToText ?
                <Image source={require("../assets/images/microphone_start.png")} style={styles.image}/> :
                <Image source={require("../assets/images/microphone_stop.png")} style={styles.image}/>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 550,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 300,
        resizeMode: "stretch"
    }
})