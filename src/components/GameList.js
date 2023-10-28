import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native"
import GameItem from "./GameItem"
import { test, test2 } from "../services/firebase/test";
import { createDatabase } from "../services/firebase/firestore";
import GameServices from "../services/firebase/GameServices";

const gameListInitial = []

export default function GameList({ navigation }) {
    const [gameList, setGameList] = useState(gameListInitial)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const gameList = await GameServices.getGameList()
          if (gameList) {
            setGameList(gameList)
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }, [])

    function handlePress({ gameId, gameName }) {
        navigation.navigate("LevelList", { gameId, gameName })
    }

    return (
        <ScrollView>
            <Button title="test" onPress={() => { test() }}/>
            <Button title="test2" onPress={() => { test2() }}/>
            <Button title="createDatabase" onPress={() => { createDatabase() }}/>
            <View style={styles.container}>
                {
                    gameList.map((game, index) => {
                        return (
                            <TouchableOpacity 
                              key={game.id} 
                              onPress={() => handlePress({gameId: game.id, gameName: game.gameName})}
                            >
                                <GameItem id={game.id} name={game.gameName} />
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