import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Layout from "../../layout"

const settingListData = [
    {
        screenName: "LanguageSetting",
        iconName: "earth"
    },
    {
        screenName: "NotificationSetting",
        iconName: "clock-edit"
    },
    {
        screenName: "PrivacySetting",
        iconName: "lock"
    },
    {
        screenName: "ProfileSetting",
        iconName: "account-cog"
    },
    {
        screenName: "SecuritySetting",
        iconName: "security"
    },
    {
        screenName: "SoundSetting",
        iconName: "cellphone-sound"
    }
]

function SettingItem({ navigation, screenName, iconName }) {
    function handlePress() {
        navigation.navigate('SettingsNavigation', { screen: screenName })
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

export default function SettingsScreen({ navigation }) {
    return (
        <Layout>
            <Text style={styles.title}>Settings</Text>
            <ScrollView>
                {
                    settingListData.map((settingItem, index) => {
                        return (
                            <SettingItem 
                                key={index} 
                                navigation={navigation} 
                                screenName={settingItem.screenName} 
                                iconName={settingItem.iconName}
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