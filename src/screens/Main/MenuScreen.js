import { useState, useEffect } from "react"
import { Text, View, ScrollView, StyleSheet, Button, TouchableOpacity, Alert, TextInput } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { CommonActions } from '@react-navigation/native';
import Layout from "../../layout"
import AuthService from "../../services/firebase/AuthServices"

const menuListData = [
    {
        screenName: "Profile",
        alt: "Thông tin cá nhân",
        iconName: "account"
    },
    {
        screenName: "Premium",
        alt: "Gói Premium",
        iconName: "diamond-stone"
    },
    {
        screenName: "Statistic",
        alt: "Thống kê",
        iconName: "chart-bar"
    },
    {
        screenName: "History",
        alt: "Lịch sử",
        iconName: "history"
    },
    {
        screenName: "Notification",
        alt: "Thông báo",
        iconName: "bell-badge"
    },
    {
        screenName: "Settings",
        alt: "Cài đặt",
        iconName: "cog"
    },
    {
        screenName: "Contact",
        alt: "Liên hệ",
        iconName: "help-circle"
    },
    {
        screenName: "TermsOfService",
        alt: "Điều khoản dịch vụ",
        iconName: "form-select"
    }
]

function MenuItem({ navigation, item }) {
    function handlePress() {
        navigation.navigate('MenuNavigation', { screen: item.screenName })
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

export default function MenuScreen({ navigation }) {
    const [isAdult, setIsAdult] = useState(false)

    function handleLogout(){
        Alert.alert(
            title="Thông báo",
            message="Bạn có chắc muốn đăng xuất không?",
            buttons=[
                {
                    text: "CÓ", 
                    onPress: async () => {
                        await AuthService.logout()
                        //console.log("Logout success")
                        navigation.dispatch(CommonActions.reset({
                            index: 0,
                            routes: [
                              { name: "AuthNavigation" }
                            ]
                          }));
                    }
                },
                {
                    text: "KHÔNG",
                    onPress: () => {
                        //console.log("Canceled")
                    }
                }
            ],
            options={
                cancelable: true
            }
        )
    }

    function checkAdult(value) {
        if (value == "IV Kids") {
            setIsAdult(true)
        }
    }


    return (
        <Layout>
            <Text style={styles.title}>Menu</Text>
            {
                !isAdult && (
                    <View>
                        <Text style={styles.secondary}>Để xác nhận bạn là người lớn, vui lòng nhập "IV Kids"</Text>
                        <TextInput
                            placeholder='IV Kids'
                            onChangeText={checkAdult}
                            style={styles.input}
                        />
                    </View>
                )
            }
            {
                isAdult && (
                    <View style={styles.container}>
                        {
                            menuListData.map((menuItem, index) => {
                                return (
                                    <MenuItem 
                                        key={index} 
                                        navigation={navigation} 
                                        item={menuItem}
                                    />
                                )
                            })
                        }
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#3498db' }]}
                            onPress={handleLogout}
                        >
                            <Text style={styles.buttonText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
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
    secondary: {
        color: "#0dcaf0",
        margin: 10,
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center'
    },
    text: {
        color: "#508D69",
        margin: 10,
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    button: {
        marginVertical: 10,
        padding: 10,
        width: "100%",
        backgroundColor: '#2ecc71',
        borderRadius: 5,
        alignItems: 'center', // Canh giữa nội dung bên trong TouchableOpacity
    },
        buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})