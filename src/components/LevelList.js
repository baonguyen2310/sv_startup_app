import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import LevelItem from "./LevelItem"

const levelList = new Array(10).fill(1)

export default function LevelList() {
    return (
        <View style={styles.container}>
            {
                levelList.map((game, index) => {
                    return (
                        <TouchableOpacity key={index}>
                            <LevelItem />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    }
})