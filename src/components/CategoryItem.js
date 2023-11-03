import { View, Text, StyleSheet } from 'react-native'

export default function CategoryItem({ category }) {
    return (
        <View style={styles.container}>
            <Text>{category}</Text>
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