import { View, Text, StyleSheet, Image } from 'react-native'
import useTheme from '../themes'

export default function GameItem({ game }) {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <Text style={theme.text}>{game.gameName}</Text>
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
    },
    text: {
        color: "#fff"
    }
})