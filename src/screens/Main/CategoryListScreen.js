import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CategoryItem from "../../components/CategoryItem"
import LevelServices from "../../services/firebase/LevelServices"
import Layout from "../../layout"

const categoryListInitial = {}

export default function CategoryListScreen({ navigation, route }) {
  const { gameId, gameName } = route.params;
  const [categoryList, setCategoryList] = useState(categoryListInitial)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const levelList = await LevelServices.getLevelList({ gameId })
        if (levelList) {
            const newCategoryList = {}
            levelList.forEach((level) => {
                const category = level.category
                if (!newCategoryList[category]) {
                    newCategoryList[category] = []
                }
                newCategoryList[category].push(level)
            })
            setCategoryList(newCategoryList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function handlePress({ gameName, category, levelList }) {
    navigation.navigate("LevelList", { gameName, category, levelList })
  }

  return (
    <Layout>
      <Text>Trò chơi: {gameName}</Text>
      <ScrollView>
        <Text>Chọn chủ đề</Text>
        <View style={styles.container}>
          {Object.keys(categoryList).map((category, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress({ 
                    gameName, 
                    category, 
                    levelList: categoryList[category] 
                })}
              >
                <CategoryItem category={category} />
              </TouchableOpacity>
            )
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
