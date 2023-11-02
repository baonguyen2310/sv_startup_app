import { Text, View, StyleSheet, useWindowDimensions } from "react-native"
import AIAssistant from "../components/AIAssitant"

export default function Layout({ children, hasAIAssistant = true, sentenseList = [] }) {
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <View style={{ height: height, margin: 10 }}>
            {children}
            {
                hasAIAssistant ? 
                <AIAssistant 
                    height={height} 
                    isPortrait={isPortrait} 
                    sentenceList={sentenseList} 
                /> : <></>
            }
        </View>
    )
}
