import { Text, View } from "react-native"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"
import LevelList from "../components/LevelList"

export default function LevelListScreen({ navigation }) {
    return (
        <View>
            <LevelList />
            <AIAssistant />
        </View>
    )
}