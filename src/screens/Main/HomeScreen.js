import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import GameItem from "../../components/GameItem";
import { createDatabase } from "../../services/firebase/firestore";
import GameServices from "../../services/firebase/GameServices";
import Layout from "../../layout";

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

export default function HomeScreen({ navigation }) {
  const { user } = useSelector((state) => state.userReducer);
  const sentenceList = [
    `Xin chào bé ${user.childName}! Chị sẽ hướng dẫn bé chơi nha!`,
    `Bé ${user.childName} hãy chọn một trò chơi mà bé thích!`,
  ];

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
    navigation.navigate("CategoryList", { gameId, gameName });
  }

  return (
    <Layout sentenseList={sentenceList}>
      <Text style={styles.contentText}>Chào bé {user.childName}</Text>
      <ScrollView >
        <Button 
          title="BabylonTextToSpeechWebView" 
          onPress={()=>navigation.navigate('BabylonTextToSpeech')}
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
    </Layout>
  );
}

const styles = StyleSheet.create({

})