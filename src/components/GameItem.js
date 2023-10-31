import { View, Text, StyleSheet, Image } from 'react-native'

export default function GameItem({ game }) {
    return (
        <View style={styles.container}>
            <Text>{game.gameName}</Text>
            {
                game.thumbnail_url && (
                    <Image style={styles.image} source={{ uri: game.thumbnail_url }} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
        backgroundColor: "lightgreen",
        marginVertical: 10
    },
    image: {
        width: "100%",
        height: "100%"
    }
})