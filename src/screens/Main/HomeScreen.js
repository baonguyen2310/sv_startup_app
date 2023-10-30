import { Text, View } from "react-native"
import Layout from "../../layout"
import styles from "../../assets/styles"
import GameList from "../../components/GameList"

import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
    const { user } = useSelector((state) => state.userReducer);

    return (
        <Layout>
            <Text style={styles.contentText}>Chào bé {user.childName}</Text>
            <GameList navigation={ navigation }/>
        </Layout>
    )
}