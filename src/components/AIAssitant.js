import { View, Text, StyleSheet } from "react-native";

export default function AIAssistant() {
    return (
        <View style={styles.container}>
            <Text>AIAssistant</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'skyblue',
        padding: 20
    }
})