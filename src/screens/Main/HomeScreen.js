import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image
} from "react-native";
import GameItem from "../../components/GameItem";
import { createDatabase } from "../../services/firebase/firestore";
import GameServices from "../../services/firebase/GameServices";
import Layout from "../../layout";
import useTheme from "../../themes";
import { tinhTuoi } from "../../utils";

export default function HomeScreen({ navigation }) {
  const theme = useTheme()

  const { user } = useSelector((state) => state.userReducer);
  const sentenceList = [
    `Xin chào bé ${user.childName}! Chị sẽ hướng dẫn bé chơi nha!`,
    `Bé ${user.childName} hãy chọn một trò chơi mà bé thích!`,
  ];

  const [gameList, setGameList] = useState();
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
    <Layout sentenseList={sentenceList} isHomeScreen navigation={navigation}>
      <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none" }}>
        <Image source={ require('../../assets/images/start.gif') } />
      </View>
      <ScrollView >
        <Text style={[styles.primary, theme.primaryText]}>Chào bé {user.childName}!</Text>
        <Text style={styles.primary}>Cùng chơi nào!</Text>
        <Text style={styles.secondary}>
          Các trò chơi dành cho bé {user.childName} {tinhTuoi(new Date(user.childBirthdate))} tuổi
        </Text>

        {/* <Button 
          title="BabylonTextToSpeechWebView" 
          onPress={()=>navigation.navigate('BabylonTextToSpeech')}
        />
        <Button
          title="createDatabase"
          onPress={() => {
            createDatabase();
          }}
        /> */}
        <View style={styles.container}>
          {gameList && gameList.filter((value) => value.status == 'active' && value.allowAges.includes(tinhTuoi(new Date(user.childBirthdate)))).map((game, index) => {
            return (
              <TouchableOpacity
                key={game.id}
                onPress={() =>
                  handlePress({ gameId: game.id, gameName: game.gameName.replace(/\\n/g, "\n") })
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
  container: {
    paddingBottom: 200
  },
  primary: {
    color: "#F875AA",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  secondary: {
    color: "#0dcaf0",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "400"
  }
})