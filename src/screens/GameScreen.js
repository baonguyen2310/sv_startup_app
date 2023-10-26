import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../layout";
import {
    GameBody_1
} from "../games/index"

export default function GameScreen({ route, navigation }) {
    // những game được cập nhật trong server phải có body tương ứng trong code
    // thì mới có trạng thái published (status: beta, published, deleted )
    const gameListData = [{name: "game_1"}] // get từ server
    const gameBodyList = [
        {
            id: 0,
            component: GameBody_1
        }
    ] // get từ code

    const { levelId, gameId } = route.params

    const foundGameBody = gameBodyList.find(gameBody => gameBody.id == gameId)

    return (
        <Layout>
            <View style={styles.header}>
                <Text>GameId: {gameId}</Text>
                <Text>LevelId: {levelId}</Text>
            </View>
            <View style={styles.body}>
                {
                    foundGameBody ? (
                        <foundGameBody.component />
                    ) : (
                        <Text>Game chưa ra mắt</Text>
                    )
                }
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    header: {

    },
    body: {
        width: "100%",
        height: "80%",
        backgroundColor: "skyblue"
    }
})