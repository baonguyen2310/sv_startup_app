import { View, Text, StyleSheet, Image } from 'react-native'
import useTheme from '../themes'

export default function CategoryItem({ category, imageUrl }) {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: "100%" }}>
                <Text style={[theme.text, styles.text]}>{category}</Text>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 5,
        zIndex: 1,
        textAlign: 'center',
        fontWeight: 700,
        textAlignVertical: 'center',
        backgroundColor: "#9376E0",
        color: "white",
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
        borderRadius: 10
    }
})