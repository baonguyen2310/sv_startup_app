import { View, Text, StyleSheet, Image } from 'react-native'
import useTheme from '../themes'

export default function LevelItem({ level }) {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: "100%" }}>
                <Text style={[theme.text, styles.text]}>{level.title}</Text>
                <Image source={{ uri: level.thumbnail_url }} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        marginVertical: 10,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: "#F699CD"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden"
    },
    text: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 10,
        zIndex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
        textShadowColor: '#FF4DA6',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 40
    }
})