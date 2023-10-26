import { View, Text, StyleSheet } from 'react-native'

export default function LevelItem({ id, name }) {
    return (
        <View style={styles.container}>
            <Text>{id}</Text>
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