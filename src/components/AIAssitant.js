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
            <TouchableOpacity onPress={handlePress} style={{ ...styles.image }}>
                <Image
                    source={require("../assets/images/bear3.gif")} 
                    style={styles.image}
                />
                {/* <Text style={stylesRoot.contentText}>AIAssistant</Text> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        //bottom: 60,
        right: 0,
        width: 150,
        height: 150,
        // borderWidth: 3,
        // borderRadius: 75,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
        overflow: "hidden"
    }
})