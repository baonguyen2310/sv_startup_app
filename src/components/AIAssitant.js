import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech'
import stylesRoot from "../assets/styles"


export default function AIAssistant({ height, isPortrait, sentenceList = [] }) {

    function handlePress() {
        const sentence = sentenceList[Math.floor(Math.random() * sentenceList.length)]
        Speech.speak(sentence)
    }

    return (
        <View style={{ ...styles.container, top: isPortrait? height - 220: height - 260 }}>
            <TouchableOpacity onPress={handlePress}>
                <Image
                    source={require("../assets/images/AIAssistant.png")} 
                    style={styles.image}
                />
                <Text style={stylesRoot.contentText}>AIAssistant</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        //bottom: 60,
        right: 0,
        width: 120,
        height: 120
    },
    image: {
        width: 120,
        height: 120
    }
})