import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Layout from "../../layout"

const menuListData = [
    {
        screenName: "Profile",
        iconName: "account"
    },
    {
        screenName: "Premium",
        iconName: "diamond-stone"
    },
    {
        screenName: "Statistic",
        iconName: "chart-bar"
    },
    {
        screenName: "History",
        iconName: "history"
    },
    {
        screenName: "Notification",
        iconName: "bell-badge"
    },
    {
        screenName: "Settings",
        iconName: "cog"
    },
    {
        screenName: "Contact",
        iconName: "help-circle"
    },
    {
        screenName: "TermsOfService",
        iconName: "form-select"
    }
]

function MenuItem({ navigation, screenName, iconName }) {
    function handlePress() {
        navigation.navigate('MenuNavigation', { screen: screenName })
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemContainer}>
                <MaterialCommunityIcons name={iconName} color="#333" size={34} />
                <Text style={styles.text}>{screenName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function MenuScreen({ navigation }) {
    return (
        <Layout>
            <Text style={styles.title}>Menu</Text>
            <ScrollView>
                {
                    menuListData.map((menuItem, index) => {
                        return (
                            <MenuItem 
                                key={index} 
                                navigation={navigation} 
                                screenName={menuItem.screenName} 
                                iconName={menuItem.iconName}
                            />
                        )
                    })
                }
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        textAlign: "center"
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    text: {
        margin: 5,
        fontSize: 24,
        color: "#333"
    }
})