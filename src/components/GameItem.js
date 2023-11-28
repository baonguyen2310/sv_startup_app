import { View, Text, StyleSheet, Image } from 'react-native'
import useTheme from '../themes'

export default function GameItem({ game }) {
    const theme = useTheme()

    return (
        <View style={ styles.container }>
            <Text style={[theme.text, styles.text]}>{game.gameName.replace(/\\n/g, "\n")}</Text>
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
        marginVertical: 5,
        borderWidth: 10,
        borderRadius: 20,
        borderColor: "#F699CD"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        overflow: "hidden"
    },
    text: {
        color: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 10,
        zIndex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 700,
        fontSize: 30,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 10, height: 10},
        textShadowRadius: 50,
    }
})