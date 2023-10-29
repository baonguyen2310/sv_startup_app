import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import LevelItem from "./LevelItem"
import LevelServices from "../services/firebase/LevelServices";

const levelListInitital = [];

export default function LevelList({ navigation, gameId, gameName }) {
    const [levelList, setLevelList] = useState(levelListInitital);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const levelList = await LevelServices.getLevelList({ gameId });
          if (levelList) {
            console.log(levelList)
            levelList.sort((a, b) => a.createdAt - b.createdAt);
            setLevelList(levelList);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);


    function handlePress({ levelId, gameId, gameName }) {
        navigation.navigate("Game", { levelId, gameId, gameName })
    }

    return (
        <ScrollView>
            <Text>Chọn màn chơi</Text>
            <View style={styles.container}>
                {
                    levelList.map((level, index) => {
                        return (
                            <TouchableOpacity 
                              key={level.id} 
                              onPress={() => handlePress({ levelId: level.id, gameId, gameName })}
                            >
                                <LevelItem id={level.id} name={level.name} />
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    }
})