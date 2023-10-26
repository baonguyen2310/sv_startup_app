import { Text, View } from "react-native"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"

export default function SettingsScreen({ navigation }) {
    return (
        <View>
            <Text style={styles.contentText}>SettingsScreen</Text>
            <AIAssistant />
        </View>
    )
}