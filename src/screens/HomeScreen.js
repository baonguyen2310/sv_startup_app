import { Text, View } from "react-native"
import Header from "../components/Header"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"
import GameList from "../components/GameList"


export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Header navigation={navigation} />
            <Text style={styles.contentText}>HomeScreen</Text>
            <GameList navigation={ navigation }/>
            <AIAssistant />
        </View>
    )
}