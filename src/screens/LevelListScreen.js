import { Text, View } from "react-native"
import Layout from "../layout"
import styles from "../assets/styles"
import LevelList from "../components/LevelList"

export default function LevelListScreen({ navigation, route }) {
    const { gameId, gameName } = route.params

    return (
        <Layout>
            <Text>Trò chơi: {gameName}</Text>
            <LevelList navigation={navigation} gameId={gameId} />
        </Layout>
    )
}