import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import GameItem from "./GameItem"

const gameList = new Array(10).fill(1)

export default function GameList({ navigation }) {
    function handlePress() {
        navigation.navigate("LevelList")
    }

    return (
        <View style={styles.container}>
            {
                gameList.map((game, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={handlePress}>
                            <GameItem />
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