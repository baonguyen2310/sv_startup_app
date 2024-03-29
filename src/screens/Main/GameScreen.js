import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../../layout";
import gameBodyList from "../../games/index"

export default function GameScreen({ route, navigation }) {
    // những game được cập nhật trong server phải có body tương ứng trong code
    // thì mới có trạng thái published (status: beta, published, deleted )
    const gameListData = [{name: "game_1"}] // get từ server

    const { gameName, level } = route.params

    const foundGameBody = gameBodyList.find(gameBody => gameBody.gameId == level.gameId)

    let GameBodyComponent = NotFoundGameBodyComponent

    if (foundGameBody) {
        GameBodyComponent = foundGameBody.component
    }

    return (
        <Layout hasAIAssistant={false}>
            {/* <View style={styles.header}>
                <Text>Trò chơi: {gameName}</Text>
                <Text>Level: {level.id}</Text>
                <Text>Time: 30s</Text>
                <Text>Score: 100</Text>
            </View> */}
            <View style={styles.body}>
                <GameBodyComponent time={60} requireScore={80} level={level} navigation={navigation}/>
            </View>
        </Layout>
    )
}

function NotFoundGameBodyComponent() {
    return (
        <Text>Game chưa ra mắt</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    body: {
        width: "100%",
        height: "100%",
        // backgroundColor: "skyblue"
    }
})