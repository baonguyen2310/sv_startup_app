import { View, Text, StyleSheet, Image } from 'react-native'

export default function LevelItem({ level }) {
    return (
        <View style={styles.container}>
            <Text>{level.title}</Text>
            <Image style={styles.image} source={{ uri: level.thumbnail_url }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 100,
        backgroundColor: "pink",
        margin: 5
    },
    image: {
        width: "100%",
        height: "100%"
    }
})