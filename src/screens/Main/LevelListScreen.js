import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Layout from "../../layout";
import LevelItem from "../../components/LevelItem";

export default function LevelListScreen({ navigation, route }) {
  const { gameName, category, levelList } = route.params;

  function handlePress({ gameName, level }) {
    navigation.navigate("Game", { gameName, level });
  }

  return (
    <Layout>
      <Text style={styles.primary}>{gameName}</Text>
      <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none", left: 0, bottom: -600 }}>
        <Image style={styles.imageSmall} source={ require('../../assets/images/planet_3.gif') } />
        <Image style={styles.imageSmall} source={ require('../../assets/images/start.gif') } />
      </View>
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
      <View style={{ zIndex: -1, height: "100%", position: "absolute", pointerEvents: "none", left: 150, bottom: -300 }}>
        <Image style={styles.imageSmall} source={ require('../../assets/images/man.gif') } />
        <Image style={styles.imageSmall} source={ require('../../assets/images/start.gif') } />
      </View>
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
  imageSmall: {
    width: 100,
    height: 100
  },
  primary: {
    color: "#3AA6B9",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  secondary: {
    color: "#B15EFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  }
});
