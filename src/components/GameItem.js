import { View, Text, StyleSheet } from 'react-native'

export default function GameItem({ id, name }) {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
        backgroundColor: "lightgreen",
        marginVertical: 10
    }
})