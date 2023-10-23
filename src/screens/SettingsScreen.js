import { Text, View } from "react-native"
import Header from "../components/Header"
import styles from "../assets/styles"
import AIAssistant from "../components/AIAssitant"

export default function SettingsScreen({ navigation }) {
    return (
        <View>
            <Header navigation={navigation} />
            <Text style={styles.contentText}>SettingsScreen</Text>
            <AIAssistant />
        </View>
    )
}