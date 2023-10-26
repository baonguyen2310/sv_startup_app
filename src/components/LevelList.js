import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import LevelItem from "./LevelItem"

const levelListData = [
    {
      id: "0",
      name: "Chair",
    },
    {
      id: "1",
      name: "Cobra",
    },
    {
      id: "2",
      name: "Dog",
    },
    {
      id: "3",
      name: "No_Pose",
    },
    {
      id: "4",
      name: "Shoulderstand",
    },
    {
      id: "5",
      name: "Traingle",
    },
    {
      id: "6",
      name: "Tree",
    },
    {
      id: "7",
      name: "Warrior",
    },
    {
      id: "8",
      name: "Chair",
    },
    {
      id: "9",
      name: "Cobra",
    },
    {
      id: "10",
      name: "Dog",
    },
    {
      id: "11",
      name: "No_Pose",
    },
    {
      id: "12",
      name: "Shoulderstand",
    },
    {
      id: "13",
      name: "Traingle",
    },
    {
      id: "14",
      name: "Tree",
    },
    {
      id: "15",
      name: "Warrior",
    },
    {
      id: "20",
      name: "Chair",
    },
    {
      id: "21",
      name: "Cobra",
    },
    {
      id: "22",
      name: "Dog",
    },
    {
      id: "23",
      name: "No_Pose",
    },
    {
      id: "24",
      name: "Shoulderstand",
    },
    {
      id: "25",
      name: "Traingle",
    },
    {
      id: "26",
      name: "Tree",
    },
    {
      id: "27",
      name: "Warrior",
    },
    {
      id: "28",
      name: "Chair",
    },
    {
      id: "29",
      name: "Cobra",
    },
    {
      id: "30",
      name: "Dog",
    },
    {
      id: "31",
      name: "No_Pose",
    },
    {
      id: "32",
      name: "Shoulderstand",
    },
    {
      id: "33",
      name: "Traingle",
    },
    {
      id: "34",
      name: "Tree",
    }
];

export default function LevelList({ navigation, gameId }) {
    function handlePress({ levelId, gameId }) {
        navigation.navigate("Game", { levelId, gameId })
    }

    return (
        <ScrollView>
            <Text>Chọn màn chơi</Text>
            <View style={styles.container}>
                {
                    levelListData.map((level, index) => {
                        return (
                            <TouchableOpacity 
                              key={level.id} 
                              onPress={() => handlePress({ levelId: level.id, gameId: gameId })}
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