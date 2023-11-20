import { View, Text, StyleSheet, Image } from 'react-native'
import useTheme from '../themes'

export default function LevelItem({ level }) {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={{ 
                width: "100%", 
                height: "80%", 
                width: 150,
                height: 150,
                borderWidth: 5,
                borderRadius: 20,
                borderColor: "#F699CD" 
            }}>
                <Image source={{ uri: level.thumbnail_url }} style={styles.image} />
            </View>
            <Text style={styles.text}>{level.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden"
    },
    text: {
        padding: 10,
        zIndex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        textShadowColor: '#FF4DA6',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 40
    }
})