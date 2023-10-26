import { Text, View } from "react-native"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"
import GameList from "../components/GameList"


export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text style={styles.contentText}>HomeScreen</Text>
            <GameList navigation={ navigation }/>
            <AIAssistant />
        </View>
    )
}