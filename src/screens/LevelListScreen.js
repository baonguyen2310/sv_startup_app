import { Text, View } from "react-native"
import Header from "../components/Header"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"
import LevelList from "../components/LevelList"

export default function LevelListScreen({ navigation }) {
    return (
        <View>
            <Header navigation={navigator} />
            <LevelList />
            <AIAssistant />
        </View>
    )
}