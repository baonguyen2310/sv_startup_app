import { View, Text, StyleSheet } from 'react-native'

export default function GameItem() {
    return (
        <View style={styles.container}>
            <Text>Game Item</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 175,
        height: 100,
        backgroundColor: "lightgreen",
        margin: 10
    }
})