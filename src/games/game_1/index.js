import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function GameBody({ time = 30, requireScore = 100 }) {
    return (
        <View>
            <Text>GameBody 1</Text>
            <Text>Time: {time}</Text>
            <Text>Require Score: {requireScore}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})