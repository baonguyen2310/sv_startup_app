import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import GameItem from "./GameItem"

const gameListData = [
    {
      id: "0",
      name: "TỪ VỰNG",
    },
    {
      id: "1",
      name: "SẮP XẾP TỪ TRONG CÂU",
    },
    {
      id: "2",
      name: "KỂ CHUYỆN",
    },
    {
      id: "3",
      name: "NHIỀU TRÒ CHƠI HƠN",
    },
  ];

export default function GameList({ navigation }) {
    function handlePress({ gameId, gameName }) {
        navigation.navigate("LevelList", { gameId, gameName })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    gameListData.map((game, index) => {
                        return (
                            <TouchableOpacity 
                              key={game.id} 
                              onPress={() => handlePress({gameId: game.id, gameName: game.name})}
                            >
                                <GameItem id={game.id} name={game.name} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // justifyContent: "space-between",
        // alignItems: "center"
    }
})