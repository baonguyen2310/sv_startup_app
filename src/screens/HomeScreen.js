import { Text, View } from "react-native"
import Layout from "../layout"
import styles from "../assets/styles"
import GameList from "../components/GameList"


export default function HomeScreen({ navigation }) {
    return (
        <Layout>
            <Text style={styles.contentText}>HomeScreen</Text>
            <GameList navigation={ navigation }/>
        </Layout>
    )
}