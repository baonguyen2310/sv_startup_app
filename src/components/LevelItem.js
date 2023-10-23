import { View, Text, StyleSheet } from 'react-native'

export default function LevelItem() {
    return (
        <View style={styles.container}>
            <Text>Level Item</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: "pink",
        margin: 10
    }
})