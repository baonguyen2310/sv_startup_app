import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import HistoryServices from '../../services/firebase/HistoryServices'

export default function HistoryScreen() {
  const [histories, setHistories] = useState([])
  useEffect (() => {
    async function fetchData() {
      try {
        const histories = await HistoryServices.getHistoryByUserId()
        setHistories(histories)
      } catch (error) {
        setHistories([])
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử chơi của bé</Text>
      {
        histories.map((history, index) => {
          return (
            <View style={styles.itemContainer} key={history.id} >
              <View style={styles.header}>
                <Text>gameId: {history.gameId}</Text>
                <Text>levelId: {history.levelId}</Text>
              </View>
              <View style={styles.content}>
                <Text>stars: {history.stars}</Text>
                <Text>Bắt đầu: {(new Date(history.startTime.seconds*1000)).toLocaleString()}</Text>
                <Text>Kết thúc: {(new Date(history.endTime.seconds*1000)).toLocaleString()}</Text>
                <Text>Thời gian chơi: {Math.round(history.endTime - history.startTime)}</Text>
                <Text>{history.completed ? "Đã hoàn thành": "Chưa hoàn thành"}</Text>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  header: {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F875AA'
  },
  content: {
    fontSize: 16,
  },
});