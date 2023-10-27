import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function MenuButton({ navigation }) {
    function handlePress() {
        navigation.navigate("Menu")
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons name="menu" size={36} color="#333" />
        </TouchableOpacity>
    )
}