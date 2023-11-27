import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Layout from "../../layout"

const settingListData = [
    {
        screenName: "LanguageSetting",
        alt: "Cài đặt ngôn ngữ",
        iconName: "earth"
    },
    {
        screenName: "NotificationSetting",
        alt: "Cài đặt thông báo",
        iconName: "clock-edit"
    },
    {
        screenName: "PrivacySetting",
        alt: "Cài đặt quyền riêng tư",
        iconName: "lock"
    },
    {
        screenName: "ProfileSetting",
        alt: "Cài đặt profile",
        iconName: "account-cog"
    },
    {
        screenName: "SecuritySetting",
        alt: "Cài đặt bảo mật",
        iconName: "security"
    },
    {
        screenName: "SoundSetting",
        alt: "Cài đặt âm thanh",
        iconName: "cellphone-sound"
    }
]

function SettingItem({ navigation, item }) {
    function handlePress() {
        navigation.navigate('SettingsNavigation', { screen: item.screenName })
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemContainer}>
                <MaterialCommunityIcons name={item.iconName} color="#508D69" size={34} />
                <Text style={styles.text}>{item.alt}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function SettingsScreen({ navigation }) {
    return (
        <Layout>
            <Text style={styles.title}>Cài đặt</Text>
            <ScrollView style={styles.container}>
                {
                    settingListData.map((settingItem, index) => {
                        return (
                            <SettingItem 
                                key={index} 
                                navigation={navigation} 
                                item={settingItem}
                            />
                        )
                    })
                }
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#F875AA'
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
    },
    text: {
        color: "#508D69",
        margin: 10,
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center'
    },
})