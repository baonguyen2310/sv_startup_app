import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import GameItem from "./GameItem";
import { test, test2 } from "../services/firebase/test";
import { createDatabase } from "../services/firebase/firestore";
import GameServices from "../services/firebase/GameServices";

const gameListInitial = [
  {
    description: "Mô tả trò chơi",
    gameName: "Từ vựng",
    id: "hJcaehYOG48HsOZahthM",
    status: "active",
  },
  {
    description: "Mô tả trò chơi",
    gameName: "Sắp xếp từ trong câu",
    id: "Z8bxYCs0h3gkfQqTeME3",
    status: "active",
  },
  {
    description: "Mô tả trò chơi",
    gameName: "Kể chuyện",
    id: "rq9ZbIEa4sR23lg3EjvN",
    status: "active",
  },
];

export default function GameList({ navigation }) {
  const [gameList, setGameList] = useState(gameListInitial);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameList = await GameServices.getGameList();
        if (gameList) {
          gameList.sort((a, b) => a.id - b.id);
          setGameList(gameList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function handlePress({ gameId, gameName }) {
    navigation.navigate("LevelList", { gameId, gameName });
  }

  return (
    <ScrollView>
      <Button
        title="test"
        onPress={() => {
          test();
        }}
      />
      <Button
        title="test2"
        onPress={() => {
          test2();
        }}
      />
      <Button
        title="createDatabase"
        onPress={() => {
          createDatabase();
        }}
      />
      <View style={styles.container}>
        {gameList.map((game, index) => {
          return (
            <TouchableOpacity
              key={game.id}
              onPress={() =>
                handlePress({ gameId: game.id, gameName: game.gameName })
              }
            >
              <GameItem game={game} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // alignItems: "center"
  },
});
