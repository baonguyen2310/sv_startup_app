import { Text, View, StyleSheet, useWindowDimensions } from "react-native"
import AIAssistant from "../components/AIAssitant"

export default function Layout({ children }) {
    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <View style={{ height: height, margin: 10 }}>
            {children}
            <AIAssistant height={height} isPortrait={isPortrait} />
        </View>
    )
}
