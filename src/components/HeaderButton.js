import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HeaderButton({ navigation }) {
    function handlePress() {
        navigation.navigate("Settings")
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons name="settings-sharp" size={36} color="#333" />
        </TouchableOpacity>
    )
}