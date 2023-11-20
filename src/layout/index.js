import { Text, View, StyleSheet, useWindowDimensions } from "react-native"
import AIAssistant from "../components/AIAssitant"
import useTheme from "../themes"

export default function Layout({ 
    children,
    hasAIAssistant = true, 
    sentenseList = [],
    styleCustom
}) {
    const theme = useTheme()

    const { height, width } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <View style={{ ...theme.container, height: height, padding: 0, ...styleCustom }}>
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
