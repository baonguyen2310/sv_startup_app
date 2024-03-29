import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import CategoryItem from "../../components/CategoryItem"
import LevelServices from "../../services/firebase/LevelServices"
import Layout from "../../layout"
import { tinhTuoi } from "../../utils";


const categoryListInitial = {}

export default function CategoryListScreen({ navigation, route }) {
  const { user } = useSelector((state) => state.userReducer);

  const { gameId, gameName } = route.params;
  const [categoryList, setCategoryList] = useState(categoryListInitial)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const levelList = await LevelServices.getLevelList({ gameId })
        if (levelList) {
            const newCategoryList = {}
            levelList.filter((value) => value.allowAges.includes(tinhTuoi(new Date(user.childBirthdate)))).forEach((level) => {
                const category = level.category
                if (!newCategoryList[category]) {
                    newCategoryList[category] = []
                }
                newCategoryList[category].push(level)
            })
            setCategoryList(newCategoryList);
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchData();
  }, []);

  function handlePress({ gameName, category, levelList }) {
    navigation.navigate("LevelList", { gameName, category, levelList })
  }

  return (
    <Layout>
        <Text style={styles.primary} >{gameName}</Text>
        {/* <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none", right: 0, top: 50 }}>
          <Image style={styles.imageSmall} source={ require('../../assets/images/star.gif') } />
          <Image style={styles.imageSmall} source={ require('../../assets/images/start.gif') } />
        </View> */}
        <ScrollView>
          <View style={styles.fullContainer}>
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
                  <CategoryItem category={category} imageUrl={categoryList[category][0].thumbnail_url} />
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
        <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none", left: 0, bottom: -600 }}>
          <Image style={styles.imageSmall} source={ require('../../assets/images/planet_2.gif') } />
          <Image style={styles.imageSmall} source={ require('../../assets/images/start.gif') } />
        </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    paddingBottom: 200,
  },
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
  image: {
    width: "100%",
    height: "100%"
  },
  primary: {
    color: "#46369b",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  secondary: {
    color: "#B15EFF",
    fontSize: 24,
    fontWeight: "bold"
  },
  containerBackground: {
    height: "100%",
    backgroundColor: "#132043"
  }
});
