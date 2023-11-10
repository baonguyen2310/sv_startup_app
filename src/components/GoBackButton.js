import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function GoBackButton({ navigation }) {
    function handlePress() {
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons name="arrow-back" size={36} color="#333" />
        </TouchableOpacity>
    )
}