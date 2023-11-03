import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../../layout";
import LevelItem from "../../components/LevelItem";

export default function LevelListScreen({ navigation, route }) {
  const { gameName, category, levelList } = route.params;

  function handlePress({ gameName, level }) {
    navigation.navigate("Game", { gameName, level });
  }

  return (
    <Layout>
      <Text>Trò chơi: {gameName}</Text>
      <Text>Chủ đề: {category}</Text>
      <Text>Chọn màn chơi</Text>
      <ScrollView>
        <View style={styles.container}>
          {levelList.map((level, index) => {
            return (
              <TouchableOpacity
                key={level.id}
                onPress={() => handlePress({ gameName, level })}
              >
                <LevelItem level={level} />
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
