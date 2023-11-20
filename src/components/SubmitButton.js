import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>OK!</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EA1179",
        borderRadius: 60,
        borderWidth: 10,
        borderColor: "white",
        width: 120,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.00,

        elevation: 24,
    },
    text: {
        // width: 80,
        // height: 80,
        // borderRadius: 50,
        // backgroundColor: "red",
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }
})