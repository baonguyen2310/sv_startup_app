import { Text, View } from "react-native"
import Layout from "../../layout"
import styles from "../../assets/styles"
import GameList from "../../components/GameList"

import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
    const { user } = useSelector((state) => state.userReducer);
    const sentenceList = [
        `Xin chào bé ${user.childName}! Chị sẽ hướng dẫn bé chơi nha!`,
        `Bé ${user.childName} hãy chọn một trò chơi mà bé thích!`
    ]

    return (
        <Layout sentenseList={sentenceList}>
            <Text style={styles.contentText}>Chào bé {user.childName}</Text>
            <GameList navigation={ navigation }/>
        </Layout>
    )
}