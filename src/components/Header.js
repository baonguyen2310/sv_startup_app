import { Text, View, Button } from 'react-native'
import styles from '../assets/styles'


export default function Header({ navigation }) {
    function handlePress() {
        navigation.navigate("Settings")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Logo</Text>
            <Button title="Settings" onPress={handlePress} />
        </View>
    )
}