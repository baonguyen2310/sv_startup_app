import { View, StyleSheet } from "react-native"
import Logo from "./Logo"
import MenuButton from "./MenuButton"
import GoBackButton from "./GoBackButton"

export default function Header({ navigation, isHomeScreen = false }) {
    return (
        <View style={styles.container}>
            {
                isHomeScreen ? <Logo /> : <GoBackButton navigation={navigation} />
            }
            <MenuButton navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})